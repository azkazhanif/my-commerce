import { Head, useForm } from '@inertiajs/react';

const Login = () => {
    // 1. Initialize Inertia form helper
    const { data, setData, post, processing, errors } = useForm({
        email: 'admin@ecommerce.test',
        password: 'Admin123!@#',
        remember: false, // Optional: if you want "Remember Me" functionality
    });

    // 2. Handle form submission
    const submit = (e) => {
        e.preventDefault();
        post(route('admin.signin'));
    };

    return (
        <>
            <Head title="Login - Admin" />
            <div className="grid min-h-screen grid-cols-2 gap-4 p-4 md:p-8">
                <div className="col-span-2 flex flex-col items-center justify-center bg-white p-4 md:col-span-1 md:p-8">
                    <div className="w-full max-w-md">
                        {/* Header Section */}
                        <div className="mb-8 text-center md:text-left">
                            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-emerald-900 md:text-4xl">
                                Welcome Back,{' '}
                                <span className="text-emerald-600">Admin.</span>
                            </h1>
                            <p className="text-base text-gray-500">
                                Securely login to your dashboard to manage
                                settings.
                            </p>
                        </div>

                        {/* Form Section */}
                        <form onSubmit={submit} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className={`block w-full rounded-lg border bg-gray-50 p-3 pl-10 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 sm:text-sm ${
                                            errors.email
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                                : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-500'
                                        }`}
                                        placeholder="admin@saldoin.com"
                                        autoComplete="email"
                                    />
                                </div>
                                {/* Error Message */}
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className={`block w-full rounded-lg border bg-gray-50 p-3 pl-10 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 sm:text-sm ${
                                            errors.password
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                                : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-500'
                                        }`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {/* Error Message */}
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative flex w-full justify-center rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processing
                                    ? 'Signing in...'
                                    : 'Sign In to Dashboard'}
                            </button>
                        </form>

                        {/* Footer / Divider */}
                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-400">
                                        Support
                                    </span>
                                </div>
                            </div>
                            <p className="mt-4 text-center text-sm text-gray-500">
                                Forgot your password?{' '}
                                <a
                                    href="#"
                                    className="font-medium text-emerald-600 transition-colors hover:text-emerald-500 hover:underline"
                                >
                                    Contact Super Admin
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side Image */}
                <div className="hidden h-full w-full md:block">
                    <img
                        src={`/storage/admin/login.png`}
                        alt="Admin Login"
                        className="h-full w-full rounded-2xl object-cover"
                    />
                </div>
            </div>
        </>
    );
};

export default Login;
