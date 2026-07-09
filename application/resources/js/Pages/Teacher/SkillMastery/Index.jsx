import { Head, Link } from '@inertiajs/react';
import DashboardSection from '../../../Components/dashboard/DashboardSection';
import MetricCard from '../../../Components/dashboard/MetricCard';
import PageHeader from '../../../Components/shell/PageHeader';
import AppShell from '../../../Layouts/AppShell';

export default function Index({ course, metrics, skills, learners_needing_support: learnersNeedingSupport }) {
    return (
        <AppShell title="Skill mastery">
            <Head title="Skill Mastery" />
            <PageHeader
                description={
                    course
                        ? `Skill evidence and support gaps for ${course.title}.`
                        : 'Skill mastery summaries for your institution.'
                }
                title="Skill mastery"
            />

            <DashboardSection title="Summary">
                <div className="grid gap-4 md:grid-cols-3">
                    {metrics.map((metric) => (
                        <MetricCard hint={metric.hint} key={metric.label} label={metric.label} value={metric.value} />
                    ))}
                </div>
            </DashboardSection>

            <DashboardSection title="Learners needing support">
                {learnersNeedingSupport.length === 0 ? (
                    <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-6 text-sm text-[var(--color-text-secondary)]">
                        No learners currently flagged for skill support gaps.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {learnersNeedingSupport.map((learner) => (
                            <div
                                className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4"
                                key={learner.id}
                            >
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <div>
                                        <p className="font-medium text-[var(--color-text-primary)]">{learner.name}</p>
                                        <p className="text-xs text-[var(--color-text-muted)]">{learner.email}</p>
                                    </div>
                                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                        {learner.gap_count} gap{learner.gap_count === 1 ? '' : 's'}
                                    </span>
                                </div>
                                <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-secondary)]">
                                    {learner.gaps.map((gap) => (
                                        <li key={gap.skill_slug}>
                                            <span className="font-medium text-[var(--color-text-primary)]">
                                                {gap.skill_name}
                                            </span>
                                            {' — '}
                                            {gap.reasons.join('; ')}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </DashboardSection>

            <DashboardSection title="Skills">
                {skills.length === 0 ? (
                    <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-6 text-sm text-[var(--color-text-secondary)]">
                        No published skills found for the default course.
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-white shadow-sm">
                        <table className="min-w-full divide-y divide-[var(--color-border-subtle)]">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                        Skill
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                        Mastery
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                        Demonstrated
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                        In progress
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                        Not started
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                        Need support
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--color-border-subtle)]">
                                {skills.map((skill) => (
                                    <tr key={skill.slug}>
                                        <td className="px-4 py-4 text-sm font-medium text-[var(--color-text-primary)]">
                                            {skill.name}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                                                    <div
                                                        className="h-full rounded-full bg-violet-600"
                                                        style={{ width: `${skill.mastery_percent}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-[var(--color-text-muted)]">
                                                    {skill.mastery_percent}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-[var(--color-text-secondary)]">
                                            {skill.demonstrated_count}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-[var(--color-text-secondary)]">
                                            {skill.in_progress_count}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-[var(--color-text-secondary)]">
                                            {skill.not_started_count}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-[var(--color-text-secondary)]">
                                            {skill.learners_needing_support}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </DashboardSection>

            <div className="mt-8 flex flex-wrap gap-4">
                <Link className="text-sm font-medium text-blue-600 hover:text-blue-700" href="/teacher/classes">
                    Class overview
                </Link>
                <Link className="text-sm font-medium text-blue-600 hover:text-blue-700" href="/teacher">
                    Teacher dashboard
                </Link>
            </div>
        </AppShell>
    );
}
