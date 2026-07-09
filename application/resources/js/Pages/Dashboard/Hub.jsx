import { Head, Link } from '@inertiajs/react';

export default function Hub({ auth, tenant }) {
    return (
        <main className="min-h-screen bg-[var(--color-background-subtle)] px-6 py-12 text-[var(--color-text-primary)]">
            <Head title="Workspace Hub" />
            <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--color-border-subtle)] bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-bold tracking-tight">Welcome, {auth.user?.name}</h1>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                    Your account is signed in, but no active institution workspace is available yet.
                </p>
                <Link
                    className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    href="/institution/select"
                >
                    Choose institution
                </Link>
                {!tenant?.institution ? null : (
                    <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                        Institution context: {tenant.institution.name}
                    </p>
                )}
            </div>
        </main>
    );
}
