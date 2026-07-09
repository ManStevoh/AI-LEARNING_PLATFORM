import { Head, Link } from '@inertiajs/react';
import DashboardSection from '../../Components/dashboard/DashboardSection';
import MetricCard from '../../Components/dashboard/MetricCard';
import PageHeader from '../../Components/shell/PageHeader';
import AppShell from '../../Layouts/AppShell';

export default function Dashboard({ metrics, course }) {
    const nextLesson = course?.next_lesson;

    return (
        <AppShell title="Learner dashboard">
            <Head title="Learner Dashboard" />
            <PageHeader
                action={
                    course ? (
                        <Link
                            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                            href="/learner/learn"
                        >
                            {nextLesson ? 'Continue lesson' : 'Open learning path'}
                        </Link>
                    ) : null
                }
                description={
                    course
                        ? `You are on ${course.title}. Your next lesson and units are ready to explore.`
                        : 'Your next learning actions, progress, and projects in one place.'
                }
                title="Learner dashboard"
            />

            <DashboardSection title="Today">
                <div className="grid gap-4 md:grid-cols-3">
                    {metrics.map((metric) => (
                        <MetricCard hint={metric.hint} key={metric.label} label={metric.label} value={metric.value} />
                    ))}
                </div>
            </DashboardSection>

            {course ? (
                <DashboardSection title="Level 1 path">
                    <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5">
                        <p className="font-medium text-[var(--color-text-primary)]">{course.title}</p>
                        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{course.description}</p>
                        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                            {course.module_count} units · Ages {course.age_band}
                        </p>
                        <Link
                            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                            href="/learner/learn"
                        >
                            View all units
                        </Link>
                    </div>
                </DashboardSection>
            ) : null}

            <DashboardSection title="AI mentor">
                <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
                    <p className="font-medium text-violet-900">
                        Ask for help with {nextLesson?.title ?? 'your current Blockly project'}.
                    </p>
                    <p className="mt-2 text-sm text-violet-800">
                        The mentor will use your lesson context and guide you without giving the full answer.
                    </p>
                </div>
            </DashboardSection>
        </AppShell>
    );
}
