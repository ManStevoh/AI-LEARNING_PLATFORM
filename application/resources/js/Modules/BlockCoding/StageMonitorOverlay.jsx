import { MONITOR_BY_ID } from './stageMonitors.js';

export default function StageMonitorOverlay({ monitors = [], onMoveMonitor = null, onMoveMonitorEnd = null }) {
    if (!Array.isArray(monitors) || monitors.length === 0) {
        return null;
    }

    return (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
            {monitors.map((monitor) => {
                const staticMeta = MONITOR_BY_ID[monitor.id];
                const label = monitor.label ?? staticMeta?.label;
                const color = monitor.color ?? staticMeta?.color;

                if (!label || monitor.visible === false) {
                    return null;
                }

                return (
                    <div
                        className="pointer-events-auto absolute select-none"
                        key={monitor.id}
                        style={{ left: monitor.x, top: monitor.y }}
                        onPointerDown={(event) => {
                            if (!onMoveMonitor) {
                                return;
                            }

                            event.preventDefault();
                            event.stopPropagation();

                            const startX = event.clientX;
                            const startY = event.clientY;
                            const originX = monitor.x;
                            const originY = monitor.y;

                            const onMove = (moveEvent) => {
                                onMoveMonitor(monitor.id, {
                                    x: Math.max(0, originX + (moveEvent.clientX - startX)),
                                    y: Math.max(0, originY + (moveEvent.clientY - startY)),
                                });
                            };

                            const onUp = () => {
                                window.removeEventListener('pointermove', onMove);
                                window.removeEventListener('pointerup', onUp);
                                onMoveMonitorEnd?.(monitor.id);
                            };

                            window.addEventListener('pointermove', onMove);
                            window.addEventListener('pointerup', onUp);
                        }}
                    >
                        <div
                            className="flex min-w-[7.5rem] items-center justify-between gap-3 rounded-md border border-black/10 px-2 py-1 text-xs shadow-sm"
                            style={{ backgroundColor: color, color: '#fff' }}
                        >
                            <span className="font-medium opacity-95">{label}</span>
                            <span className="rounded bg-white/95 px-1.5 py-0.5 font-semibold text-slate-800">
                                {formatMonitorValue(monitor.value)}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function formatMonitorValue(value) {
    if (typeof value === 'number') {
        return Number.isInteger(value) ? String(value) : value.toFixed(2);
    }

    if (value === null || value === undefined || value === '') {
        return '—';
    }

    return String(value);
}
