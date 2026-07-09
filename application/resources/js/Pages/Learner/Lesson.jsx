import { Head, Link } from '@inertiajs/react';
import BlockLessonWorkspace from '../../Modules/BlockCoding/BlockLessonWorkspace';
import MentorPanel from '../../Modules/BlockCoding/MentorPanel';
import AppShell from '../../Layouts/AppShell';

export default function Lesson({ lesson, workspace, savedProject, starterProject }) {
    return (
        <AppShell codingFocus title={lesson.title} wide>
            <Head title={lesson.title} />
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                    <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">{lesson.title}</h1>
                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                        Unit {lesson.module.sort_order} · {lesson.course.title} · {lesson.estimated_minutes} min
                    </p>
                </div>
                <Link
                    className="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-700"
                    href="/learner/learn"
                >
                    Back to path
                </Link>
            </div>

            <details className="mb-4 rounded-xl border border-[var(--color-border-subtle)] bg-white px-4 py-3">
                <summary className="cursor-pointer text-sm font-medium text-[var(--color-text-primary)]">
                    Lesson info
                </summary>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{lesson.summary}</p>
                {lesson.skills.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                        {lesson.skills.map((skill) => (
                            <li key={skill.slug}>
                                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                                    {skill.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </details>

            <BlockLessonWorkspace
                savedProject={savedProject}
                starterProject={starterProject}
                workspaceConfig={workspace}
            />

            <details className="mt-4 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3">
                <summary className="cursor-pointer text-sm font-medium text-violet-900">AI mentor</summary>
                <div className="mt-3">
                    <MentorPanel lessonSlug={lesson.slug} lessonTitle={lesson.title} embedded />
                </div>
            </details>
        </AppShell>
    );
}
