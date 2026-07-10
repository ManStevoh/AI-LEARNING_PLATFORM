import { useEffect, useRef } from 'react';
import { isVideoFlipped, isVideoVisible } from './videoLayer.js';

export default function VideoOverlay({ videoState, transparency = 50, mediaEngine = null, className = '' }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!mediaEngine) {
            return undefined;
        }

        mediaEngine.attachDisplayElement(videoRef.current);

        return () => {
            mediaEngine.detachDisplayElement();
        };
    }, [mediaEngine]);

    useEffect(() => {
        const element = videoRef.current;

        if (!element) {
            return;
        }

        element.style.opacity = String(1 - transparency / 100);
        element.style.transform = isVideoFlipped(videoState) ? 'scaleX(-1)' : '';
    }, [videoState, transparency]);

    if (!isVideoVisible(videoState)) {
        return null;
    }

    return (
        <video
            autoPlay
            className={`pointer-events-none absolute inset-0 z-0 h-full w-full object-cover ${className}`.trim()}
            muted
            playsInline
            ref={videoRef}
            style={{
                opacity: 1 - transparency / 100,
                transform: isVideoFlipped(videoState) ? 'scaleX(-1)' : undefined,
            }}
        />
    );
}
