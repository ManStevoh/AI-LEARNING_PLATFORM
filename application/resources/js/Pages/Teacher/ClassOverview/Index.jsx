import { Head, Link } from '@inertiajs/react';
import DashboardSection from '../../../Components/dashboard/DashboardSection';
import MetricCard from '../../../Components/dashboard/MetricCard';
import PageHeader from '../../../Components/shell/PageHeader';
import AppShell from '../../../Layouts/AppShell';

export default function Index({ course, metrics, learners }) {
    return (
        <AppShell title="Class overview">
            <Head title="Class Overview" />
            <PageHeader
                description={
                    course
                        ? `Learner progress across ${course.title}.`
                        : 'Learner progress summaries for your institution.'
                }
                title="Class overview"
            />

            <DashboardSection title="Summary">
                <div className="grid gap-4 md:grid-cols-3">
                    {metrics.map((metric) => (
                        <MetricCard hint={metric.hint} key={metric.label} label={metric.label} value={metric.value} />
                    ))}
                </div>
            </DashboardSection>

            <DashboardSection title="Learners">
                {learners.length === 0 ? (
                    <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-6 text-sm text-[var(--color-text-secondary)]">
                        No active learners are enrolled in this institution yet.
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
                                        Progress
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                        Current lesson
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                        Last active
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--color-border-subtle)]">
                                {learners.map((learner) => (
                                    <tr key={learner.id}>
                                        <td className="px-4 py-4">
                                            <p className="font-medium text-[var(--color-text-primary)]">{learner.name}</p>
                                            <p className="text-xs text-[var(--color-text-muted)]">{learner.email}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm text-[var(--color-text-secondary)]">
                                                {learner.lessons_started} / {learner.total_lessons} lessons
                                            </p>
                                            <div className="mt-2 h-2 w-full max-w-[160px] overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className="h-full rounded-full bg-blue-600"
                                                    style={{ width: `${learner.progress_percent}%` }}
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                                {learner.lessons_with_code} with runnable code
                                            </p>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-[var(--color-text-secondary)]">
                                            {learner.current_lesson_title ?? 'Not started'}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-[var(--color-text-muted)]">
                                            {learner.last_active_at
                                                ? new Date(learner.last_active_at).toLocaleString()
                                                : 'No activity'}
                                        </td>
                                        <td className="px-4 py-4">
                                            {learner.needs_attention ? (
                                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                                    Needs attention
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                                    On track
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </DashboardSection>

            <Link className="mt-8 inline-block text-sm font-medium text-blue-600 hover:text-blue-700" href="/teacher">
                Back to teacher dashboard
            </Link>
        </AppShell>
    );
}
