import { Link, useForm } from '@inertiajs/react';

function toggleId(list, id) {
    return list.includes(id) ? list.filter((value) => value !== id) : [...list, id];
}

function BlockPackConfig({ institution, blockPacks, canUpdateBlockPacks }) {
    const catalog = blockPacks?.catalog ?? [];
    const enabled = blockPacks?.enabled ?? [];

    const form = useForm({ enabled_block_packs: enabled });
    const readOnly = !canUpdateBlockPacks;

    const handleToggle = (packId) => {
        if (readOnly) {
            return;
        }

        form.setData('enabled_block_packs', toggleId(form.data.enabled_block_packs, packId));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (readOnly) {
            return;
        }

        form.patch(`/institutions/${institution.id}/block-packs`, {
            preserveScroll: true,
        });
    };

    return (
        <section className="mt-8 rounded-2xl border border-[var(--color-border-subtle)] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Block coding packs</h2>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                        Choose which optional block packs appear in the coding toolbox for this institution.
                    </p>
                </div>
                {readOnly ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        View only
                    </span>
                ) : null}
            </div>

            {readOnly ? (
                <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-[var(--color-text-secondary)]">
                    You have view-only access to these settings. Ask an institution admin to change which block packs
                    are enabled.
                </p>
            ) : null}

            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                <fieldset className="space-y-3" disabled={readOnly || form.processing}>
                    <legend className="sr-only">Enabled block packs</legend>
                    {catalog.length === 0 ? (
                        <p className="text-sm text-[var(--color-text-muted)]">No optional block packs are available.</p>
                    ) : (
                        catalog.map((pack) => {
                            const checkboxId = `block-pack-${pack.id}`;
                            const descriptionId = `${checkboxId}-description`;
                            const isChecked = form.data.enabled_block_packs.includes(pack.id);

                            return (
                                <label
                                    className={`flex gap-3 rounded-xl border border-[var(--color-border-subtle)] p-4 transition ${
                                        readOnly
                                            ? 'cursor-not-allowed opacity-70'
                                            : 'cursor-pointer hover:border-blue-300 hover:bg-slate-50'
                                    }`}
                                    htmlFor={checkboxId}
                                    key={pack.id}
                                >
                                    <input
                                        aria-describedby={pack.description ? descriptionId : undefined}
                                        checked={isChecked}
                                        className="mt-0.5 h-4 w-4 rounded border-[var(--color-border-subtle)] text-blue-600 focus:ring-blue-400 disabled:cursor-not-allowed"
                                        disabled={readOnly}
                                        id={checkboxId}
                                        onChange={() => handleToggle(pack.id)}
                                        type="checkbox"
                                    />
                                    <span className="min-w-0">
                                        <span className="block text-sm font-medium text-[var(--color-text-primary)]">
                                            {pack.name}
                                        </span>
                                        {pack.description ? (
                                            <span
                                                className="mt-1 block text-sm text-[var(--color-text-secondary)]"
                                                id={descriptionId}
                                            >
                                                {pack.description}
                                            </span>
                                        ) : null}
                                    </span>
                                </label>
                            );
                        })
                    )}
                </fieldset>

                {form.errors.enabled_block_packs ? (
                    <p className="text-sm text-rose-700" role="alert">
                        {form.errors.enabled_block_packs}
                    </p>
                ) : null}

                <div aria-live="polite" className="min-h-[1.25rem]">
                    {form.recentlySuccessful ? (
                        <p className="text-sm font-medium text-emerald-700">Block packs updated.</p>
                    ) : null}
                </div>

                {!readOnly ? (
                    <button
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                        disabled={form.processing}
                        type="submit"
                    >
                        {form.processing ? 'Saving…' : 'Save block packs'}
                    </button>
                ) : null}
            </form>
        </section>
    );
}

export default function Show({ institution, tenant, blockPacks, canUpdateBlockPacks = false }) {
    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
            <div className="mx-auto max-w-3xl">
                <Link className="text-sm font-medium text-blue-600 hover:text-blue-700" href="/dashboard">
                    Back to dashboard
                </Link>

                <h1 className="mt-6 text-3xl font-bold tracking-tight">{institution.name}</h1>
                <p className="mt-2 text-slate-600">Institution profile for your active tenant context.</p>

                <section className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Slug</p>
                        <p className="mt-1">{institution.slug}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Country</p>
                        <p className="mt-1">{institution.country_code}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Your role</p>
                        <p className="mt-1">{tenant?.role ?? 'member'}</p>
                    </div>
                </section>

                {blockPacks ? (
                    <BlockPackConfig
                        blockPacks={blockPacks}
                        canUpdateBlockPacks={canUpdateBlockPacks}
                        institution={institution}
                    />
                ) : null}
            </div>
        </main>
    );
}
