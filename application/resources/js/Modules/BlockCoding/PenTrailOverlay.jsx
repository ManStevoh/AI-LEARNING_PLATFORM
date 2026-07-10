import { scratchSegmentToStagePixels } from './penLayer.js';

export default function PenTrailOverlay({ trails = [], stage, className = '' }) {
    if (!Array.isArray(trails) || trails.length === 0) {
        return null;
    }

    const width = stage?.width ?? 480;
    const height = stage?.height ?? 360;

    return (
        <svg
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
            preserveAspectRatio="none"
            viewBox={`0 0 ${width} ${height}`}
        >
            {trails.map((segment, index) => {
                const line = scratchSegmentToStagePixels(segment, stage);

                return (
                    <line
                        key={`pen-${index}-${segment.x1}-${segment.y1}-${segment.x2}-${segment.y2}`}
                        stroke={segment.color}
                        strokeLinecap="round"
                        strokeWidth={segment.size}
                        x1={line.x1}
                        x2={line.x2}
                        y1={line.y1}
                        y2={line.y2}
                    />
                );
            })}
        </svg>
    );
}
