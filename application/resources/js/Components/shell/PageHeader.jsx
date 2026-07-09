export default function PageHeader({ title, description, action }) {
    return (
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">{title}</h1>
                {description ? <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-secondary)]">{description}</p> : null}
            </div>
            {action ? <div>{action}</div> : null}
        </div>
    );
}
