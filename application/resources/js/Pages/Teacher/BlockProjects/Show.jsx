import { Head, Link, useForm } from '@inertiajs/react';
import PageHeader from '../../../Components/shell/PageHeader';
import AppShell from '../../../Layouts/AppShell';

export default function Show({ project }) {
    const form = useForm({
        notes: project.feedback?.notes ?? '',
    });

    const submitFeedback = (event) => {
        event.preventDefault();
        form.post(`/teacher/block-projects/${project.id}/feedback`, {
            preserveScroll: true,
        });
    };

    return (
        <AppShell title="Review block project">
            <Head title="Review Block Project" />
            <PageHeader
                description={`${project.learner.name} · ${project.lesson_title}`}
                title="Review block project"
            />

            <div className="space-y-6">
                <section className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                        Project summary
                    </h2>
                    <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                            <dt className="text-xs text-[var(--color-text-muted)]">Learner</dt>
                            <dd className="mt-1 text-sm text-[var(--color-text-primary)]">{project.learner.email}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[var(--color-text-muted)]">Lesson slug</dt>
                            <dd className="mt-1 text-sm text-[var(--color-text-primary)]">{project.lesson_slug}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[var(--color-text-muted)]">Workspace blocks</dt>
                            <dd className="mt-1 text-sm text-[var(--color-text-primary)]">{project.workspace_block_count}</dd>
                        </div>
                        <div>
                            <dt className="text-xs text-[var(--color-text-muted)]">Last saved</dt>
                            <dd className="mt-1 text-sm text-[var(--color-text-primary)]">
                                {project.last_saved_at
                                    ? new Date(project.last_saved_at).toLocaleString()
                                    : 'Unknown'}
                            </dd>
                        </div>
                    </dl>
                </section>

                <section className="rounded-2xl border border-[var(--color-border-subtle)] bg-slate-950 p-5">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Generated JavaScript</h2>
                    <pre className="mt-3 overflow-x-auto text-sm leading-6 text-slate-100">
                        <code>{project.generated_code ?? '// No generated code saved yet.'}</code>
                    </pre>
                </section>

                <section className="rounded-2xl border border-[var(--color-border-subtle)] bg-white p-5 shadow-sm">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                        Teacher feedback
                    </h2>
                    {project.feedback ? (
                        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                            Last updated by {project.feedback.teacher_name}
                            {project.feedback.updated_at
                                ? ` · ${new Date(project.feedback.updated_at).toLocaleString()}`
                                : ''}
                        </p>
                    ) : null}
                    <form className="mt-4 space-y-3" onSubmit={submitFeedback}>
                        <textarea
                            className="min-h-[120px] w-full rounded-xl border border-[var(--color-border-subtle)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:border-blue-400 focus:outline-none"
                            onChange={(event) => form.setData('notes', event.target.value)}
                            placeholder="Share encouragement, next steps, or debugging hints for the learner."
                            value={form.data.notes}
                        />
                        {form.errors.notes ? (
                            <p className="text-sm text-rose-700">{form.errors.notes}</p>
                        ) : null}
                        <button
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                            disabled={form.processing}
                            type="submit"
                        >
                            {form.processing ? 'Saving…' : 'Save feedback'}
                        </button>
                    </form>
                </section>
            </div>

            <Link className="mt-8 inline-block text-sm font-medium text-blue-600 hover:text-blue-700" href="/teacher/block-projects">
                Back to project list
            </Link>
        </AppShell>
    );
}
