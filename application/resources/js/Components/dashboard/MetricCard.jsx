export default function MetricCard({ label, value, hint }) {
    return (
        <article className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-default)] p-5 shadow-sm">
            <p className="text-sm font-medium text-[var(--color-text-muted)]">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">{value}</p>
            {hint ? <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{hint}</p> : null}
        </article>
    );
}
