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
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="rounded-full transition-colors flex items-center justify-center bg-black text-white dark:bg-white dark:text-black gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm sm:text-base h-12 px-6"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/vercel.svg" alt="Vercel logomark" width={20} height={20} className="dark:invert" />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-sm sm:text-base h-12 px-6"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center text-sm text-gray-600 dark:text-gray-400">
        <a
          className="flex items-center gap-2 hover:text-gray-800 dark:hover:text-white transition-colors"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/file.svg" alt="File icon" width={16} height={16} className="dark:invert" />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:text-gray-800 dark:hover:text-white transition-colors"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/window.svg" alt="Window icon" width={16} height={16} className="dark:invert" />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:text-gray-800 dark:hover:text-white transition-colors"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} className="dark:invert" />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}

