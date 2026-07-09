import { useForm } from '@inertiajs/react';

export default function Select({ memberships, activeInstitutionId }) {
    const { data, setData, post, processing, errors } = useForm({
        institution_id: activeInstitutionId ?? memberships[0]?.id ?? '',
    });

    const submit = (event) => {
        event.preventDefault();
        post('/institution/switch');
    };

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
            <div className="mx-auto max-w-xl">
                <h1 className="text-3xl font-bold tracking-tight">Choose your institution</h1>
                <p className="mt-2 text-slate-600">Select the institution workspace you want to use for this session.</p>

                <form className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={submit}>
                    <fieldset className="space-y-3">
                        <legend className="sr-only">Institution memberships</legend>
                        {memberships.map((membership) => (
                            <label
                                className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 hover:border-blue-300"
                                key={membership.id}
                            >
                                <input
                                    checked={Number(data.institution_id) === membership.id}
                                    className="mt-1"
                                    name="institution_id"
                                    onChange={() => setData('institution_id', membership.id)}
                                    type="radio"
                                    value={membership.id}
                                />
                                <span>
                                    <span className="block font-semibold">{membership.name}</span>
                                    <span className="mt-1 block text-sm text-slate-600">
                                        Role: {membership.role}
                                    </span>
                                </span>
                            </label>
                        ))}
                    </fieldset>

                    {errors.institution_id ? <p className="text-sm text-red-600">{errors.institution_id}</p> : null}

                    <button
                        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                        disabled={processing}
                        type="submit"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </main>
    );
}
