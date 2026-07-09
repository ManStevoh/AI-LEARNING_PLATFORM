import { Link, useForm, usePage } from '@inertiajs/react';

export default function AppTopBar() {
    const { auth, tenant, app } = usePage().props;
    const { post, processing } = useForm({});

    const logout = (event) => {
        event.preventDefault();
        post('/logout');
    };

    return (
        <header className="flex h-16 items-center justify-between border-b border-[var(--color-border-subtle)] bg-[var(--color-background-default)] px-4 lg:px-6">
            <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">{app?.name ?? 'ACE Platform'}</p>
                <p className="text-xs text-[var(--color-text-muted)]">
                    {tenant?.institution?.name ?? 'No institution selected'}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    aria-label="Open AI mentor"
                    className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700"
                    type="button"
                >
                    AI Mentor
                </button>
                <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{auth?.user?.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{tenant?.role ?? 'guest'}</p>
                </div>
                <form onSubmit={logout}>
                    <button
                        className="rounded-lg border border-[var(--color-border-subtle)] px-3 py-2 text-sm font-medium hover:bg-[var(--color-surface-raised)] disabled:opacity-60"
                        disabled={processing}
                        type="submit"
                    >
                        Sign out
                    </button>
                </form>
                <Link className="text-sm font-medium text-blue-600 hover:text-blue-700 lg:hidden" href="/">
                    Home
                </Link>
            </div>
        </header>
    );
}
