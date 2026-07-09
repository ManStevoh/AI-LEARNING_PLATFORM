import { Link, usePage } from '@inertiajs/react';
import { useShellLayout } from '../../Layouts/ShellLayoutContext';

export default function AppSidebar() {
    const { navigation, tenant } = usePage().props;
    const currentUrl = usePage().url;
    const { sidebarCollapsed } = useShellLayout();

    if (sidebarCollapsed) {
        return null;
    }

    return (
        <aside className="hidden w-64 shrink-0 border-r border-[var(--color-border-subtle)] bg-[var(--color-background-subtle)] lg:block">
            <div className="px-4 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Workspace</p>
                <p className="mt-2 text-sm font-medium capitalize text-[var(--color-text-primary)]">{tenant?.role ?? 'member'}</p>
            </div>

            <nav aria-label="Primary" className="px-3 pb-6">
                <ul className="space-y-1">
                    {(navigation?.primary ?? []).map((item) => {
                        const isActive = currentUrl === item.href || currentUrl.startsWith(`${item.href}/`);
                        const isDisabled = item.href === '#';

                        return (
                            <li key={item.label}>
                                {isDisabled ? (
                                    <span className="block rounded-lg px-3 py-2 text-sm text-[var(--color-text-muted)]">{item.label}</span>
                                ) : (
                                    <Link
                                        aria-current={isActive ? 'page' : undefined}
                                        className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                                            isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'text-[var(--color-text-secondary)] hover:bg-white hover:text-[var(--color-text-primary)]'
                                        }`}
                                        href={item.href}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
