export default function DashboardSection({ title, children }) {
    return (
        <section className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h2>
            {children}
        </section>
    );
}
