import { Head } from '@inertiajs/react';
import DashboardSection from '../../Components/dashboard/DashboardSection';
import MetricCard from '../../Components/dashboard/MetricCard';
import PageHeader from '../../Components/shell/PageHeader';
import AppShell from '../../Layouts/AppShell';

export default function Dashboard({ metrics }) {
    return (
        <AppShell title="Institution dashboard">
            <Head title="Institution Dashboard" />
            <PageHeader
                description="Institution adoption, seat usage, and learning outcomes at a glance."
                title="Institution dashboard"
            />

            <DashboardSection title="Overview">
                <div className="grid gap-4 md:grid-cols-3">
                    {metrics.map((metric) => (
                        <MetricCard hint={metric.hint} key={metric.label} label={metric.label} value={metric.value} />
                    ))}
                </div>
            </DashboardSection>

            <DashboardSection title="Operations">
                <div className="grid gap-4 md:grid-cols-2">
                    <article className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5">
                        <p className="font-medium">Billing status</p>
                        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Pilot subscription active</p>
                    </article>
                    <article className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5">
                        <p className="font-medium">Curriculum coverage</p>
                        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Level 1 block coding in rollout</p>
                    </article>
                </div>
            </DashboardSection>
        </AppShell>
    );
}
