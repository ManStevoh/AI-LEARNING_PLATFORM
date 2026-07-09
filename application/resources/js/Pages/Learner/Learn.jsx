import { Head, Link } from '@inertiajs/react';
import PageHeader from '../../Components/shell/PageHeader';
import AppShell from '../../Layouts/AppShell';

export default function Learn({ course }) {
    return (
        <AppShell title="Learn">
            <Head title="Learn" />
            <PageHeader
                description={course.description}
                title={course.title}
            />

            <div className="space-y-4">
                {course.modules.map((module) => (
                    <article
                        className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5 shadow-sm"
                        key={module.slug}
                    >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                                    Unit {module.sort_order}
                                </p>
                                <h2 className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">{module.title}</h2>
                                {module.lesson?.summary ? (
                                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{module.lesson.summary}</p>
                                ) : null}
                            </div>
                            {module.lesson ? (
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                    {module.lesson.estimated_minutes} min
                                </span>
                            ) : null}
                        </div>
                    </article>
                ))}
            </div>

            <Link className="mt-8 inline-block text-sm font-medium text-blue-600 hover:text-blue-700" href="/learner">
                Back to dashboard
            </Link>
        </AppShell>
    );
}
