import { Head } from '@inertiajs/react';
import DashboardSection from '../../Components/dashboard/DashboardSection';
import MetricCard from '../../Components/dashboard/MetricCard';
import PageHeader from '../../Components/shell/PageHeader';
import AppShell from '../../Layouts/AppShell';

export default function Dashboard({ metrics }) {
    return (
        <AppShell title="Teacher dashboard">
            <Head title="Teacher Dashboard" />
            <PageHeader
                description="Monitor classes, submissions, and learners who need support."
                title="Teacher dashboard"
            />

            <DashboardSection title="Class overview">
                <div className="grid gap-4 md:grid-cols-3">
                    {metrics.map((metric) => (
                        <MetricCard hint={metric.hint} key={metric.label} label={metric.label} value={metric.value} />
                    ))}
                </div>
                <a className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700" href="/teacher/classes">
                    View learner progress details
                </a>
            </DashboardSection>

            <DashboardSection title="Submission queue">
                <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                        Review saved Blockly projects from learners in your classes.
                    </p>
                    <a className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700" href="/teacher/block-projects">
                        Open block project reviews
                    </a>
                </div>
            </DashboardSection>

            <DashboardSection title="Skill mastery">
                <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                        See skill evidence from block projects and learners who need prerequisite or activity support.
                    </p>
                    <a className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700" href="/teacher/skills">
                        View skill mastery and support gaps
                    </a>
                </div>
            </DashboardSection>
        </AppShell>
    );
}
