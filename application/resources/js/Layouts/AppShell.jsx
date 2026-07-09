import AppSidebar from '../Components/shell/AppSidebar';
import AppTopBar from '../Components/shell/AppTopBar';
import SkipLink from '../Components/shell/SkipLink';
import { ShellLayoutProvider, useShellLayout } from './ShellLayoutContext';

function AppShellFrame({ children, title, wide = false, codingFocus = false }) {
    const { sidebarCollapsed } = useShellLayout();

    return (
        <div className="min-h-screen bg-[var(--color-background-default)] text-[var(--color-text-primary)]">
            <SkipLink />
            <AppTopBar />
            <div className="flex min-h-[calc(100vh-4rem)]">
                <AppSidebar />
                <main className="min-w-0 flex-1" id="main-content">
                    <div
                        className={`mx-auto ${
                            codingFocus
                                ? 'max-w-none px-3 py-4 lg:px-4'
                                : wide
                                  ? 'max-w-[1600px] px-4 py-8 lg:px-8'
                                  : 'max-w-7xl px-4 py-8 lg:px-8'
                        } ${sidebarCollapsed && codingFocus ? 'xl:px-6' : ''}`}
                    >
                        {title ? <span className="sr-only">{title}</span> : null}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function AppShell({ children, title, wide = false, codingFocus = false }) {
    return (
        <ShellLayoutProvider codingFocus={codingFocus}>
            <AppShellFrame codingFocus={codingFocus} title={title} wide={wide}>
                {children}
            </AppShellFrame>
        </ShellLayoutProvider>
    );
}
