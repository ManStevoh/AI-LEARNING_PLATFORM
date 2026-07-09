const PRESET_DURATIONS_MS = {
    pop: 120,
    click: 80,
    success: 400,
    drum: 180,
};

export class SoundEngine {
    constructor() {
        this.volume = 1;
        this.audioContext = null;
        this.activeNodes = new Set();
    }

    ensureContext() {
        if (typeof window === 'undefined') {
            return null;
        }

        if (!this.audioContext) {
            const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;

            if (!AudioContextClass) {
                return null;
            }

            this.audioContext = new AudioContextClass();
        }

        if (this.audioContext.state === 'suspended') {
            void this.audioContext.resume();
        }

        return this.audioContext;
    }

    setVolume(percent = 100) {
        this.volume = Math.max(0, Math.min(1, (Number(percent) || 100) / 100));
    }

    setPitch(percent = 100) {
        this.pitch = Math.max(0, Number(percent) || 100) / 100;
    }

    stopAll() {
        for (const node of this.activeNodes) {
            try {
                node.stop?.();
                node.disconnect?.();
            } catch {
                // Node may already be stopped.
            }
        }

        this.activeNodes.clear();
    }

    trackNode(node) {
        this.activeNodes.add(node);

        node.onended = () => {
            this.activeNodes.delete(node);
        };
    }

    async playPreset(name = 'pop') {
        const context = this.ensureContext();

        if (!context) {
            return PRESET_DURATIONS_MS[name] ?? 100;
        }

        const preset = String(name);
        const durationMs = PRESET_DURATIONS_MS[preset] ?? 120;

        switch (preset) {
            case 'click':
                this.playTone(context, 880, durationMs / 1000, 'square');
                break;
            case 'success':
                this.playTone(context, 523, 0.12, 'sine');
                window.setTimeout(() => this.playTone(context, 659, 0.12, 'sine'), 100);
                window.setTimeout(() => this.playTone(context, 784, 0.16, 'sine'), 200);
                break;
            case 'drum':
                this.playNoiseBurst(context, durationMs / 1000);
                break;
            case 'pop':
            default:
                this.playTone(context, 440, durationMs / 1000, 'sine');
                break;
        }

        await new Promise((resolve) => {
            window.setTimeout(resolve, durationMs);
        });

        return durationMs;
    }

    async playUrl(urlOrUuid, urlResolver = null) {
        const url = typeof urlResolver === 'function'
            ? urlResolver(urlOrUuid)
            : urlOrUuid;

        if (!url || typeof url !== 'string') {
            return 100;
        }

        const context = this.ensureContext();

        if (!context) {
            return 100;
        }

        try {
            const response = await fetch(url, { credentials: 'same-origin' });

            if (!response.ok) {
                return 100;
            }

            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await context.decodeAudioData(arrayBuffer);
            const source = context.createBufferSource();
            const gain = context.createGain();

            source.buffer = audioBuffer;
            gain.gain.value = this.volume;
            source.connect(gain);
            gain.connect(context.destination);
            source.start();
            this.trackNode(source);

            await new Promise((resolve) => {
                window.setTimeout(resolve, audioBuffer.duration * 1000);
            });

            return audioBuffer.duration * 1000;
        } catch {
            return 100;
        }
    }

    playTone(context, frequency, durationSeconds, type = 'sine') {
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gain.gain.value = this.volume * 0.25;

        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + durationSeconds);
        this.trackNode(oscillator);
    }

    playNoiseBurst(context, durationSeconds) {
        const bufferSize = Math.floor(context.sampleRate * durationSeconds);
        const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
        const data = buffer.getChannelData(0);

        for (let index = 0; index < bufferSize; index += 1) {
            data[index] = (Math.random() * 2 - 1) * (1 - index / bufferSize);
        }

        const source = context.createBufferSource();
        const gain = context.createGain();

        source.buffer = buffer;
        gain.gain.value = this.volume * 0.35;
        source.connect(gain);
        gain.connect(context.destination);
        source.start();
        this.trackNode(source);
    }
}

export const SOUND_PRESET_OPTIONS = [
    ['pop', 'pop'],
    ['click', 'click'],
    ['success', 'success'],
    ['drum', 'drum'],
];
