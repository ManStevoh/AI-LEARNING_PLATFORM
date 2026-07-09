import { Head, Link } from '@inertiajs/react';
import BlockStagePreview from '../../Modules/BlockCoding/BlockStagePreview';
import BlockWorkspace from '../../Modules/BlockCoding/BlockWorkspace';
import PageHeader from '../../Components/shell/PageHeader';
import AppShell from '../../Layouts/AppShell';

export default function Lesson({ lesson, workspace }) {
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

                <div className="grid gap-6 xl:grid-cols-[minmax(240px,320px)_minmax(0,1fr)]">
                    <BlockStagePreview stage={workspace.stage} />
                    <BlockWorkspace lessonSlug={workspace.lesson_slug} preset={workspace.preset} />
                </div>

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
