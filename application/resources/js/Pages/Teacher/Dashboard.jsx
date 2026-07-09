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
            </DashboardSection>

            <DashboardSection title="Submission queue">
                <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                        Submission review and class assignment flows will connect here in the next sprint.
                    </p>
                </div>
            </DashboardSection>
        </AppShell>
    );
}
