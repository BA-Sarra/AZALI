import { loginAdmin } from './actions';

function errorMessage(error?: string) {
  if (error === 'missing-config') return 'Admin login is not configured yet. Check ADMIN_EMAIL, ADMIN_PASSWORD_HASH, and JWT_SECRET in .env.';
  if (error === 'invalid') return 'Invalid email or password.';
  return '';
}

export default function LoginPage({ searchParams }: { searchParams?: { error?: string } }) {
  const error = errorMessage(searchParams?.error);
  return (
    <main className="grid min-h-screen place-items-center bg-espresso p-4">
      <form action={loginAdmin} className="card w-full max-w-md bg-ivory p-8">
        <h1 className="font-display text-4xl">AZALI Admin</h1>
        <p className="mt-2 text-sm text-bark/70">Log in with the admin email and password configured in your environment variables.</p>
        <div className="mt-6">
          <label className="label">Email</label>
          <input className="input" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="mt-4">
          <label className="label">Password</label>
          <input className="input" name="password" type="password" autoComplete="current-password" required />
        </div>
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button className="btn-primary mt-6 w-full">Login</button>
      </form>
    </main>
  );
}
