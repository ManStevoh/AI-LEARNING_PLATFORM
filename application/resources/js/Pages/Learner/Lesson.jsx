import { Head, Link } from '@inertiajs/react';
import PageHeader from '../../Components/shell/PageHeader';
import AppShell from '../../Layouts/AppShell';

export default function Lesson({ lesson }) {
    return (
        <AppShell title={lesson.title}>
            <Head title={lesson.title} />
            <PageHeader
                description={`Unit ${lesson.module.sort_order} · ${lesson.course.title}`}
                title={lesson.title}
            />

            <div className="space-y-6">
                <section className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5 shadow-sm">
                    <p className="text-sm text-[var(--color-text-secondary)]">{lesson.summary}</p>
                    <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                        Estimated time: {lesson.estimated_minutes} minutes
                    </p>
                </section>

                {lesson.skills.length > 0 ? (
                    <section className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5 shadow-sm">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                            Skills in this lesson
                        </h2>
                        <ul className="mt-4 space-y-3">
                            {lesson.skills.map((skill) => (
                                <li className="flex items-start justify-between gap-3" key={skill.slug}>
                                    <span className="text-sm text-[var(--color-text-primary)]">{skill.name}</span>
                                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-700">
                                        {skill.role}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : null}

                <section className="rounded-2xl border border-dashed border-[var(--color-border-subtle)] bg-slate-50 p-5">
                    <p className="font-medium text-[var(--color-text-primary)]">Block workspace coming soon</p>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                        This lesson will open the Blockly workspace here. For now, review the skills and return to your
                        learning path.
                    </p>
                </section>
            </div>

            <Link
                className="mt-8 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                href="/learner/learn"
            >
                Back to learning path
            </Link>
        </AppShell>
    );
}
