import { Head, Link } from '@inertiajs/react';
import PageHeader from '../../../Components/shell/PageHeader';
import AppShell from '../../../Layouts/AppShell';

export default function Index({ projects }) {
    return (
        <AppShell title="Block project reviews">
            <Head title="Block Project Reviews" />
            <PageHeader
                description="Review saved Blockly projects from learners in your institution."
                title="Block project reviews"
            />

            {projects.length === 0 ? (
                <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-6 text-sm text-[var(--color-text-secondary)]">
                    No learner projects have been saved yet.
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-[var(--color-border-subtle)]">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                    Learner
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                    Lesson
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                    Last saved
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border-subtle)]">
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td className="px-4 py-4">
                                        <p className="font-medium text-[var(--color-text-primary)]">{project.learner.name}</p>
                                        <p className="text-xs text-[var(--color-text-muted)]">{project.learner.email}</p>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-[var(--color-text-secondary)]">
                                        <div className="flex items-center gap-2">
                                            <span>{project.lesson_title}</span>
                                            {project.has_feedback ? (
                                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                                    Feedback
                                                </span>
                                            ) : null}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-[var(--color-text-muted)]">
                                        {project.last_saved_at
                                            ? new Date(project.last_saved_at).toLocaleString()
                                            : 'Not saved yet'}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <Link
                                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                            href={`/teacher/block-projects/${project.id}`}
                                        >
                                            Review
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
