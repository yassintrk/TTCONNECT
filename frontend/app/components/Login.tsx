"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

export default function Login() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Vérification des identifiants admin
      if (username === "yassine" && password === "tarkhani") {
        // Données admin
        const adminUser = {
          username: "yassine",
          role: "admin",
          fullName: "Yassine Tarkhani",
          lastLogin: new Date().toISOString(),
        }

        // Stockage des données d'authentification
        localStorage.setItem("adminToken", `admin-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`)
        localStorage.setItem("adminUser", JSON.stringify(adminUser))

        // Redirection vers le tableau de bord admin
        router.push("/admin")
      }
      // Vérification des identifiants pour les autres utilisateurs (technicians, managers)
      else if (username === "admin" && password === "admin") {
        // Mock user data
        const mockUser = {
          username: "admin",
          role: "manager",
          lastLogin: new Date().toISOString(),
        }

        // Set mock auth data in localStorage
        localStorage.setItem("adminToken", "mock-token-for-testing")
        localStorage.setItem("adminUser", JSON.stringify(mockUser))
        router.push("/dashboard")
      } else {
        setError("Identifiants invalides. Veuillez réessayer.")
      }
    } catch (err) {
      setError("Une erreur s'est produite lors de la connexion.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-300">
          Nom d'utilisateur
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white"
          placeholder="Entrez votre nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </div>
    </form>
  )
}
