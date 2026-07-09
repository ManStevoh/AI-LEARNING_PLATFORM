const pillars = [
    'AI mentor and agent architecture',
    'Block coding to professional IDE',
    'Institution-first learning platform',
    'Learning Genome and competency evidence',
];

const phases = [
    'Foundation',
    'Identity and Tenancy',
    'Learning Core',
    'Block Coding',
    'AI Gateway',
    'Pilot Readiness',
];

export default function Welcome({ app }) {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 lg:px-8">
                <div className="max-w-4xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
                        {app?.name ?? 'ACE Platform'}
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        AI-native computing education, from first blocks to professional engineering.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                        This application foundation follows the Engineering Constitution, modular Laravel architecture,
                        React/Inertia delivery, AI Gateway governance, tenant isolation, and accessibility-first product
                        standards.
                    </p>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-2">
                    {pillars.map((pillar) => (
                        <article
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-blue-950/20"
                            key={pillar}
                        >
                            <h2 className="text-lg font-semibold">{pillar}</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Built as a governed platform capability, not a one-off feature.
                            </p>
                        </article>
                    ))}
                </div>

                <div className="mt-12 rounded-2xl border border-blue-400/20 bg-blue-400/10 p-6">
                    <h2 className="text-xl font-semibold">Phase 1 Build Path</h2>
                    <ol className="mt-4 grid gap-3 text-sm text-blue-100 md:grid-cols-3">
                        {phases.map((phase, index) => (
                            <li className="rounded-xl bg-slate-950/60 p-4" key={phase}>
                                <span className="text-blue-300">Phase {index + 1}</span>
                                <strong className="mt-1 block">{phase}</strong>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </main>
    );
}
