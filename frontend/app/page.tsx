import Image from "next/image"
import Login from "./components/Login"
import SignUp from "./components/SignUp"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-between p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-12 items-center">
        <Image className="dark:invert" src="/ttlogo.png" alt="Next.js logo" width={180} height={38} priority />
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Welcome to Our Platform</h1>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Get started by logging in or creating a new account
            </p>
            <div className="flex gap-8 flex-col md:flex-row justify-center">
              <div className="flex-1 max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Login</h2>
                <Login />
              </div>
              <div className="flex-1 max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Sign Up</h2>
                <SignUp />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

