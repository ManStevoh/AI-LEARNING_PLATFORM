import AppSidebar from '../Components/shell/AppSidebar';
import AppTopBar from '../Components/shell/AppTopBar';
import SkipLink from '../Components/shell/SkipLink';

export default function AppShell({ children, title }) {
    return (
        <div className="min-h-screen bg-[var(--color-background-default)] text-[var(--color-text-primary)]">
            <SkipLink />
            <AppTopBar />
            <div className="flex min-h-[calc(100vh-4rem)]">
                <AppSidebar />
                <main className="flex-1" id="main-content">
                    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
                        {title ? <span className="sr-only">{title}</span> : null}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
