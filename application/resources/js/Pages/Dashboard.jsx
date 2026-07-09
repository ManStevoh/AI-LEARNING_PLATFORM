import { Link, useForm } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const { post, processing } = useForm({});

    const logout = (event) => {
        event.preventDefault();
        post('/logout');
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto max-w-5xl px-6 py-12">
                <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">ACE Platform</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="mt-2 text-slate-600">Signed in as {auth.user?.name}</p>
                    </div>
                    <form onSubmit={logout}>
                        <button
                            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100 disabled:opacity-60"
                            disabled={processing}
                            type="submit"
                        >
                            Sign out
                        </button>
                    </form>
                </header>

                <section className="mt-8 grid gap-4 md:grid-cols-2">
                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Identity foundation</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Session authentication is active. Institution context and role-aware dashboards come next.
                        </p>
                    </article>
                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Back to docs</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Review the engineering playbook and implementation roadmap while the product shell grows.
                        </p>
                        <Link className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700" href="/">
                            Return home
                        </Link>
                    </article>
                </section>
            </div>
        </main>
    );
}
