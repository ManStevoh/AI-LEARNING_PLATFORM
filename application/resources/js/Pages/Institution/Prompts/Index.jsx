import { Head, Link } from '@inertiajs/react';
import PageHeader from '../../../Components/shell/PageHeader';
import AppShell from '../../../Layouts/AppShell';

export default function Index({ prompts }) {
    return (
        <AppShell title="AI prompt registry">
            <Head title="AI Prompt Registry" />
            <PageHeader
                description="Review platform prompts, draft new versions, and publish mentor guidance safely."
                title="AI prompt registry"
            />

            {prompts.length === 0 ? (
                <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-6 text-sm text-[var(--color-text-secondary)]">
                    No prompts have been registered yet. Run the AI prompt foundation seeder to bootstrap defaults.
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-[var(--color-border-subtle)]">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                    Prompt
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                    Versions
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                    Latest published
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border-subtle)]">
                            {prompts.map((prompt) => (
                                <tr key={prompt.id}>
                                    <td className="px-4 py-4">
                                        <p className="font-medium text-[var(--color-text-primary)]">{prompt.name}</p>
                                        <p className="text-xs text-[var(--color-text-muted)]">{prompt.prompt_key}</p>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-[var(--color-text-secondary)]">
                                        {prompt.published_version_count} published · {prompt.version_count} total
                                    </td>
                                    <td className="px-4 py-4 text-sm text-[var(--color-text-muted)]">
                                        {prompt.latest_published_version ? (
                                            <span>
                                                {prompt.latest_published_version}
                                                {prompt.latest_published_at
                                                    ? ` · ${new Date(prompt.latest_published_at).toLocaleString()}`
                                                    : ''}
                                            </span>
                                        ) : (
                                            'None'
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <Link
                                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                            href={`/institution/prompts/${prompt.id}`}
                                        >
                                            Manage
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AppShell>
    );
}
