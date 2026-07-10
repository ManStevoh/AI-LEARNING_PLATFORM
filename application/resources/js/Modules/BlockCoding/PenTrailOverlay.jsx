import { normalizeCostumeEntry, resolveCostumeImageUrl } from './costumeAssets.js';
import { scratchSegmentToStagePixels } from './penLayer.js';

function stampPositionStyle(stamp, stage) {
    const halfWidth = (stage?.width ?? 480) / 2;
    const halfHeight = (stage?.height ?? 360) / 2;
    const rotation = (stamp.rotation ?? stamp.direction ?? 90) - 90;
    const scale = stamp.scale ?? (stamp.size ?? 100) / 100;

    return {
        left: `${50 + (stamp.x / halfWidth) * 50}%`,
        top: `${50 - (stamp.y / halfHeight) * 50}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        zIndex: stamp.layer ?? 0,
        scale,
    };
}

function StampVisual({ stamp, stage, lessonSlug }) {
    const costume = stamp.costume ? normalizeCostumeEntry(stamp.costume) : null;
    const imageUrl = stamp.imageUrl ?? resolveCostumeImageUrl(costume, lessonSlug);
    const position = stampPositionStyle(stamp, stage);
    const scale = position.scale;
    const faceClass = 'flex h-12 w-12 items-center justify-center text-2xl';

    return (
        <div
            className="pointer-events-none absolute"
            style={{
                left: position.left,
                top: position.top,
                transform: position.transform,
                zIndex: position.zIndex,
            }}
        >
            {imageUrl ? (
                <img
                    alt=""
                    className={`${faceClass} object-contain`}
                    src={imageUrl}
                    style={{ transform: `scale(${scale})` }}
                />
            ) : (
                <div className={faceClass} style={{ transform: `scale(${scale})` }}>
                    {stamp.emoji ?? costume?.emoji ?? (typeof stamp.costume === 'string' ? stamp.costume : '🐱')}
                </div>
            )}
        </div>
    );
}

export default function PenTrailOverlay({ trails = [], stamps = [], stage, lessonSlug = null, className = '' }) {
    const hasTrails = Array.isArray(trails) && trails.length > 0;
    const hasStamps = Array.isArray(stamps) && stamps.length > 0;

    if (!hasTrails && !hasStamps) {
        return null;
    }

    const width = stage?.width ?? 480;
    const height = stage?.height ?? 360;

    return (
        <div className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
            {hasTrails ? (
                <svg
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full"
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
            ) : null}
            {hasStamps
                ? stamps.map((stamp, index) => (
                      <StampVisual
                          key={`stamp-${index}-${stamp.spriteId}-${stamp.x}-${stamp.y}`}
                          lessonSlug={lessonSlug}
                          stamp={stamp}
                          stage={stage}
                      />
                  ))
                : null}
        </div>
    );
}
