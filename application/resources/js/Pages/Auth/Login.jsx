import { Link, useForm } from '@inertiajs/react';
import GuestLayout from '../../Layouts/GuestLayout';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (event) => {
        event.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout title="Sign in" description="Access your learning workspace.">
            {status ? (
                <p className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                    {status}
                </p>
            ) : null}

            <form className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={submit}>
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
                        autoComplete="current-password"
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

                <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                        checked={data.remember}
                        onChange={(event) => setData('remember', event.target.checked)}
                        type="checkbox"
                    />
                    Remember me
                </label>

                <button
                    className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                    disabled={processing}
                    type="submit"
                >
                    Sign in
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
                Need an account?{' '}
                <Link className="font-medium text-blue-600 hover:text-blue-700" href="/register">
                    Register
                </Link>
            </p>
        </GuestLayout>
    );
}
