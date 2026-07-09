import { Head, Link, router, useForm } from '@inertiajs/react';
import PageHeader from '../../../Components/shell/PageHeader';
import AppShell from '../../../Layouts/AppShell';

function buildDraftDefaults(prompt) {
    const latest = prompt.latest_published;

    return {
        version: prompt.suggested_next_version,
        system_template: latest?.system_template ?? '',
        user_template: latest?.user_template ?? '',
        safety_rules: (latest?.safety_rules ?? []).join('\n'),
        changelog: '',
    };
}

export default function Show({ prompt }) {
    const form = useForm(buildDraftDefaults(prompt));

    const submitDraft = (event) => {
        event.preventDefault();

        form.transform((data) => ({
            ...data,
            safety_rules: data.safety_rules
                .split('\n')
                .map((rule) => rule.trim())
                .filter(Boolean),
        })).post(`/institution/prompts/${prompt.id}/versions`, {
            preserveScroll: true,
        });
    };

    const loadDraftVersion = (version) => {
        form.setData({
            version: version.version,
            system_template: version.system_template,
            user_template: version.user_template,
            safety_rules: (version.safety_rules ?? []).join('\n'),
            changelog: version.changelog ?? '',
        });
    };

    const publishVersion = (version) => {
        if (!window.confirm(`Publish ${version}? Published versions cannot be edited in place.`)) {
            return;
        }

        router.post(`/institution/prompts/${prompt.id}/versions/${version}/publish`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <AppShell title="Manage AI prompt">
            <Head title="Manage AI Prompt" />
            <PageHeader
                description={prompt.purpose || prompt.prompt_key}
                title={prompt.name}
            />

            <div className="space-y-6">
                <section className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                        Version history
                    </h2>
                    {prompt.versions.length === 0 ? (
                        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">No versions yet.</p>
                    ) : (
                        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--color-border-subtle)]">
                            <table className="min-w-full divide-y divide-[var(--color-border-subtle)]">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                            Version
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                            Changelog
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--color-border-subtle)]">
                                    {prompt.versions.map((version) => (
                                        <tr key={version.version}>
                                            <td className="px-4 py-4 text-sm font-medium text-[var(--color-text-primary)]">
                                                {version.version}
                                            </td>
                                            <td className="px-4 py-4">
                                                {version.is_published ? (
                                                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                                        Draft
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-[var(--color-text-secondary)]">
                                                {version.changelog || '—'}
                                            </td>
                                            <td className="px-4 py-4 text-right text-sm">
                                                {!version.is_published ? (
                                                    <div className="flex justify-end gap-3">
                                                        <button
                                                            className="font-medium text-blue-600 hover:text-blue-700"
                                                            onClick={() => loadDraftVersion(version)}
                                                            type="button"
                                                        >
                                                            Edit draft
                                                        </button>
                                                        <button
                                                            className="font-medium text-emerald-700 hover:text-emerald-800"
                                                            onClick={() => publishVersion(version.version)}
                                                            type="button"
                                                        >
                                                            Publish
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-[var(--color-text-muted)]">
                                                        {version.published_at
                                                            ? new Date(version.published_at).toLocaleString()
                                                            : 'Published'}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <section className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                        Draft editor
                    </h2>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                        Save a draft version, then publish it when ready. Published versions stay immutable.
                    </p>
                    <form className="mt-4 space-y-4" onSubmit={submitDraft}>
                        <div>
                            <label className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                Version
                            </label>
                            <input
                                className="mt-1 w-full max-w-xs rounded-xl border border-[var(--color-border-subtle)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:border-blue-400 focus:outline-none"
                                onChange={(event) => form.setData('version', event.target.value)}
                                value={form.data.version}
                            />
                            {form.errors.version ? (
                                <p className="mt-1 text-sm text-rose-700">{form.errors.version}</p>
                            ) : null}
                        </div>
                        <div>
                            <label className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                System template
                            </label>
                            <textarea
                                className="mt-1 min-h-[120px] w-full rounded-xl border border-[var(--color-border-subtle)] px-3 py-2 font-mono text-sm text-[var(--color-text-primary)] focus:border-blue-400 focus:outline-none"
                                onChange={(event) => form.setData('system_template', event.target.value)}
                                value={form.data.system_template}
                            />
                            {form.errors.system_template ? (
                                <p className="mt-1 text-sm text-rose-700">{form.errors.system_template}</p>
                            ) : null}
                        </div>
                        <div>
                            <label className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                User template
                            </label>
                            <textarea
                                className="mt-1 min-h-[120px] w-full rounded-xl border border-[var(--color-border-subtle)] px-3 py-2 font-mono text-sm text-[var(--color-text-primary)] focus:border-blue-400 focus:outline-none"
                                onChange={(event) => form.setData('user_template', event.target.value)}
                                value={form.data.user_template}
                            />
                            {form.errors.user_template ? (
                                <p className="mt-1 text-sm text-rose-700">{form.errors.user_template}</p>
                            ) : null}
                        </div>
                        <div>
                            <label className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                Safety rules
                            </label>
                            <textarea
                                className="mt-1 min-h-[80px] w-full rounded-xl border border-[var(--color-border-subtle)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:border-blue-400 focus:outline-none"
                                onChange={(event) => form.setData('safety_rules', event.target.value)}
                                placeholder="One rule per line"
                                value={form.data.safety_rules}
                            />
                            {form.errors.safety_rules ? (
                                <p className="mt-1 text-sm text-rose-700">{form.errors.safety_rules}</p>
                            ) : null}
                        </div>
                        <div>
                            <label className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                Changelog
                            </label>
                            <textarea
                                className="mt-1 min-h-[80px] w-full rounded-xl border border-[var(--color-border-subtle)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:border-blue-400 focus:outline-none"
                                onChange={(event) => form.setData('changelog', event.target.value)}
                                placeholder="What changed in this draft?"
                                value={form.data.changelog}
                            />
                            {form.errors.changelog ? (
                                <p className="mt-1 text-sm text-rose-700">{form.errors.changelog}</p>
                            ) : null}
                        </div>
                        <button
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                            disabled={form.processing}
                            type="submit"
                        >
                            {form.processing ? 'Saving…' : 'Save draft'}
                        </button>
                    </form>
                </section>
            </div>

            <Link className="mt-8 inline-block text-sm font-medium text-blue-600 hover:text-blue-700" href="/institution/prompts">
                Back to prompt registry
            </Link>
        </AppShell>
    );
}
