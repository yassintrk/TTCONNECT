import SignUp from './components/SignUp';
import Login from './components/Login';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">TTCONNECT</h1>
      <div className="flex gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
          <SignUp />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <Login />
        </div>
      </div>
    </main>
  );
}