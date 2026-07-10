import { DEFAULT_VIDEO, isVideoFlipped, isVideoVisible, normalizeVideoState, VIDEO_STATES } from './videoLayer.js';

const MOTION_WIDTH = 80;
const MOTION_HEIGHT = 60;

export function createBrowserMediaAdapter() {
    if (typeof window === 'undefined') {
        return {
            getUserMedia: async () => {
                throw new Error('Media devices are unavailable.');
            },
            requestAnimationFrame: (callback) => setTimeout(() => callback(Date.now()), 16),
            cancelAnimationFrame: (id) => clearTimeout(id),
            createElement: () => null,
            createAudioContext: () => null,
        };
    }

    return {
        getUserMedia: (constraints) => navigator.mediaDevices?.getUserMedia?.(constraints),
        requestAnimationFrame: (callback) => window.requestAnimationFrame(callback),
        cancelAnimationFrame: (id) => window.cancelAnimationFrame(id),
        createElement: (tag) => document.createElement(tag),
        createAudioContext: () => {
            const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;

            return AudioContextClass ? new AudioContextClass() : null;
        },
    };
}

function clampPercent(value, fallback = 0) {
    return Math.max(0, Math.min(100, Math.round(Number(value) || fallback)));
}

function computeFrameMotion(currentData, previousData) {
    if (!currentData || !previousData || currentData.length !== previousData.length) {
        return 0;
    }

    let diff = 0;
    const pixelCount = currentData.length / 4;

    for (let index = 0; index < currentData.length; index += 4) {
        diff += Math.abs(currentData[index] - previousData[index]);
        diff += Math.abs(currentData[index + 1] - previousData[index + 1]);
        diff += Math.abs(currentData[index + 2] - previousData[index + 2]);
    }

    const averageDiff = diff / (pixelCount * 3);

    return clampPercent((averageDiff / 64) * 100);
}

function computeRmsLoudness(analyser, buffer) {
    analyser.getByteTimeDomainData(buffer);

    let sumSquares = 0;

    for (let index = 0; index < buffer.length; index += 1) {
        const normalized = (buffer[index] - 128) / 128;
        sumSquares += normalized * normalized;
    }

    const rms = Math.sqrt(sumSquares / buffer.length);

    return clampPercent(rms * 180);
}

export class MediaSensingEngine {
    constructor({ adapter = createBrowserMediaAdapter(), onUpdate = null } = {}) {
        this.adapter = adapter;
        this.onUpdate = onUpdate;
        this.videoState = DEFAULT_VIDEO.state;
        this.transparency = DEFAULT_VIDEO.transparency;
        this.displayElement = null;
        this.videoStream = null;
        this.audioStream = null;
        this.hiddenVideoElement = null;
        this.motionCanvas = null;
        this.motionContext = null;
        this.previousFrameData = null;
        this.motionValue = 0;
        this.loudnessValue = -1;
        this.audioContext = null;
        this.analyser = null;
        this.audioSource = null;
        this.audioBuffer = null;
        this.pollId = null;
        this.disposed = false;
        this.ensureMotionCanvas();
    }

    ensureMotionCanvas() {
        if (this.motionCanvas || !this.adapter.createElement) {
            return;
        }

        this.motionCanvas = this.adapter.createElement('canvas');
        this.motionCanvas.width = MOTION_WIDTH;
        this.motionCanvas.height = MOTION_HEIGHT;
        this.motionContext = this.motionCanvas.getContext('2d', { willReadFrequently: true });
    }

    attachDisplayElement(videoEl) {
        this.displayElement = videoEl ?? null;
        this.applyDisplayPresentation();
    }

    detachDisplayElement() {
        if (this.displayElement) {
            this.displayElement.srcObject = null;
        }

        this.displayElement = null;
    }

    applyDisplayPresentation() {
        const element = this.displayElement;

        if (!element) {
            return;
        }

        element.hidden = !isVideoVisible(this.videoState);
        element.style.transform = isVideoFlipped(this.videoState) ? 'scaleX(-1)' : '';
        element.style.opacity = String(1 - this.transparency / 100);
    }

    async ensureVideo() {
        if (this.videoStream || this.disposed) {
            return this.videoStream;
        }

        if (typeof this.adapter.getUserMedia !== 'function') {
            return null;
        }

        try {
            this.videoStream = await this.adapter.getUserMedia({ video: true, audio: false });
        } catch {
            this.videoStream = null;
            return null;
        }

        this.ensureHiddenVideoElement();
        this.syncVideoPlayback();

        return this.videoStream;
    }

    async ensureAudio() {
        if (this.audioStream || this.disposed) {
            return this.audioStream;
        }

        if (typeof this.adapter.getUserMedia !== 'function') {
            this.loudnessValue = -1;
            return null;
        }

        try {
            this.audioStream = await this.adapter.getUserMedia({ video: false, audio: true });
        } catch {
            this.audioStream = null;
            this.loudnessValue = -1;
            return null;
        }

        this.setupAudioAnalyser();

        return this.audioStream;
    }

    ensureHiddenVideoElement() {
        if (this.hiddenVideoElement || !this.adapter.createElement) {
            return;
        }

        this.hiddenVideoElement = this.adapter.createElement('video');
        this.hiddenVideoElement.muted = true;
        this.hiddenVideoElement.playsInline = true;
        this.hiddenVideoElement.autoplay = true;
    }

    syncVideoPlayback() {
        const stream = this.videoStream;

        if (!stream) {
            return;
        }

        if (this.hiddenVideoElement) {
            this.hiddenVideoElement.srcObject = stream;
            void this.hiddenVideoElement.play?.().catch(() => {});
        }

        if (this.displayElement) {
            this.displayElement.srcObject = stream;
            void this.displayElement.play?.().catch(() => {});
        }
    }

    setupAudioAnalyser() {
        if (!this.audioStream || !this.adapter.createAudioContext) {
            this.loudnessValue = -1;
            return;
        }

        this.audioContext = this.adapter.createAudioContext();

        if (!this.audioContext) {
            this.loudnessValue = -1;
            return;
        }

        if (this.audioContext.state === 'suspended') {
            void this.audioContext.resume();
        }

        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.audioBuffer = new Uint8Array(this.analyser.fftSize);
        this.audioSource = this.audioContext.createMediaStreamSource(this.audioStream);
        this.audioSource.connect(this.analyser);
    }

    async setVideoState(state) {
        this.videoState = VIDEO_STATES.includes(state) ? state : DEFAULT_VIDEO.state;
        await this.ensureVideo();
        this.applyDisplayPresentation();
        this.onUpdate?.();
    }

    setVideoTransparency(value) {
        this.transparency = clampPercent(value, DEFAULT_VIDEO.transparency);
        this.applyDisplayPresentation();
        this.onUpdate?.();
    }

    getVideoState() {
        return normalizeVideoState({ state: this.videoState, transparency: this.transparency });
    }

    getVideoMotion() {
        return this.motionValue;
    }

    isVideoOn() {
        return isVideoVisible(this.videoState);
    }

    getLoudness() {
        return this.loudnessValue;
    }

    sampleMotion() {
        const videoElement = this.hiddenVideoElement ?? this.displayElement;

        if (!videoElement || !this.motionContext || videoElement.readyState < 2) {
            this.motionValue = 0;
            return;
        }

        this.motionContext.drawImage(videoElement, 0, 0, MOTION_WIDTH, MOTION_HEIGHT);
        const frame = this.motionContext.getImageData(0, 0, MOTION_WIDTH, MOTION_HEIGHT);
        const currentData = frame.data;
        this.motionValue = computeFrameMotion(currentData, this.previousFrameData);
        this.previousFrameData = new Uint8ClampedArray(currentData);
    }

    sampleLoudness() {
        if (!this.analyser || !this.audioBuffer) {
            this.loudnessValue = -1;
            return;
        }

        this.loudnessValue = computeRmsLoudness(this.analyser, this.audioBuffer);
    }

    tick() {
        if (this.disposed) {
            return;
        }

        this.sampleMotion();
        this.sampleLoudness();
        this.onUpdate?.();
        this.pollId = this.adapter.requestAnimationFrame(() => this.tick());
    }

    startPolling() {
        if (this.pollId !== null || this.disposed) {
            return;
        }

        this.pollId = this.adapter.requestAnimationFrame(() => this.tick());
    }

    stopPolling() {
        if (this.pollId === null) {
            return;
        }

        this.adapter.cancelAnimationFrame(this.pollId);
        this.pollId = null;
    }

    stopTracks(stream) {
        if (!stream) {
            return;
        }

        for (const track of stream.getTracks()) {
            track.stop();
        }
    }

    dispose() {
        if (this.disposed) {
            return;
        }

        this.disposed = true;
        this.stopPolling();
        this.detachDisplayElement();

        if (this.hiddenVideoElement) {
            this.hiddenVideoElement.srcObject = null;
            this.hiddenVideoElement = null;
        }

        this.stopTracks(this.videoStream);
        this.stopTracks(this.audioStream);
        this.videoStream = null;
        this.audioStream = null;

        try {
            this.audioSource?.disconnect?.();
        } catch {
            // Source may already be disconnected.
        }

        this.audioSource = null;
        this.analyser = null;
        this.audioBuffer = null;

        if (this.audioContext) {
            void this.audioContext.close?.();
            this.audioContext = null;
        }

        this.previousFrameData = null;
        this.motionValue = 0;
        this.loudnessValue = -1;
    }
}
