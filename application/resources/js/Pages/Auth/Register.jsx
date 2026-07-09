import { Link, useForm } from '@inertiajs/react';
import GuestLayout from '../../Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (event) => {
        event.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout title="Create account" description="Start your computing education journey.">
            <form className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={submit}>
                <div>
                    <label className="block text-sm font-medium text-slate-700" htmlFor="name">
                        Name
                    </label>
                    <input
                        autoComplete="name"
                        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        id="name"
                        name="name"
                        onChange={(event) => setData('name', event.target.value)}
                        required
                        type="text"
                        value={data.name}
                    />
                    {errors.name ? <p className="mt-2 text-sm text-red-600">{errors.name}</p> : null}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        autoComplete="username"
                        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        id="email"
                        name="email"
                        onChange={(event) => setData('email', event.target.value)}
                        required
                        type="email"
                        value={data.email}
                    />
                    {errors.email ? <p className="mt-2 text-sm text-red-600">{errors.email}</p> : null}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        autoComplete="new-password"
                        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        id="password"
                        name="password"
                        onChange={(event) => setData('password', event.target.value)}
                        required
                        type="password"
                        value={data.password}
                    />
                    {errors.password ? <p className="mt-2 text-sm text-red-600">{errors.password}</p> : null}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700" htmlFor="password_confirmation">
                        Confirm password
                    </label>
                    <input
                        autoComplete="new-password"
                        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        id="password_confirmation"
                        name="password_confirmation"
                        onChange={(event) => setData('password_confirmation', event.target.value)}
                        required
                        type="password"
                        value={data.password_confirmation}
                    />
                </div>

                <button
                    className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                    disabled={processing}
                    type="submit"
                >
                    Create account
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
                Already registered?{' '}
                <Link className="font-medium text-blue-600 hover:text-blue-700" href="/login">
                    Sign in
                </Link>
            </p>
        </GuestLayout>
    );
}
