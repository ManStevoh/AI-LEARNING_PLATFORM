import { Head } from '@inertiajs/react';
import DashboardSection from '../../Components/dashboard/DashboardSection';
import MetricCard from '../../Components/dashboard/MetricCard';
import PageHeader from '../../Components/shell/PageHeader';
import AppShell from '../../Layouts/AppShell';

export default function Dashboard({ metrics }) {
    return (
        <AppShell title="Learner dashboard">
            <Head title="Learner Dashboard" />
            <PageHeader
                action={
                    <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700" type="button">
                        Continue lesson
                    </button>
                }
                description="Your next learning actions, progress, and projects in one place."
                title="Learner dashboard"
            />

            <DashboardSection title="Today">
                <div className="grid gap-4 md:grid-cols-3">
                    {metrics.map((metric) => (
                        <MetricCard hint={metric.hint} key={metric.label} label={metric.label} value={metric.value} />
                    ))}
                </div>
            </DashboardSection>

            <DashboardSection title="AI mentor">
                <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
                    <p className="font-medium text-violet-900">Ask for help with your current Blockly project.</p>
                    <p className="mt-2 text-sm text-violet-800">
                        The mentor will use your lesson context and guide you without giving the full answer.
                    </p>
                </div>
            </DashboardSection>
        </AppShell>
    );
}
