export default function GuestLayout({ children, title, description }) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12">
                <header className="mb-8 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">ACE Platform</p>
                    <h1 className="mt-3 text-2xl font-bold tracking-tight">{title}</h1>
                    {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
                </header>
                <main>{children}</main>
            </div>
        </div>
    );
}
