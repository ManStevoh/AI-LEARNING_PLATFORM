import { Link } from '@inertiajs/react';

export default function Show({ institution, tenant }) {
    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
            <div className="mx-auto max-w-3xl">
                <Link className="text-sm font-medium text-blue-600 hover:text-blue-700" href="/dashboard">
                    Back to dashboard
                </Link>

                <h1 className="mt-6 text-3xl font-bold tracking-tight">{institution.name}</h1>
                <p className="mt-2 text-slate-600">Institution profile for your active tenant context.</p>

                <section className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Slug</p>
                        <p className="mt-1">{institution.slug}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Country</p>
                        <p className="mt-1">{institution.country_code}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Your role</p>
                        <p className="mt-1">{tenant?.role ?? 'member'}</p>
                    </div>
                </section>
            </div>
        </main>
    );
}
