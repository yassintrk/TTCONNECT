"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import AnimatedBackground from "../components/AnimatedBackground"

export default function Login() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
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
      // Vérification des identifiants pour le manager Nidhal
      else if (username === "nidhal" && password === "nsiri") {
        // Données manager
        const managerUser = {
          username: "nidhal",
          role: "manager",
          fullName: "Nidhal Nsiri",
          lastLogin: new Date().toISOString(),
        }

        // Stockage des données d'authentification
        localStorage.setItem("adminToken", `manager-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`)
        localStorage.setItem("adminUser", JSON.stringify(managerUser))

        // Redirection vers le tableau de bord manager
        router.push("/manager")
      }
      // Vérification des identifiants pour le technicien Ahmed
      else if (username === "ahmed" && password === "benali") {
        // Données technicien
        const technicianUser = {
          username: "ahmed",
          role: "technician",
          fullName: "Ahmed Benali",
          lastLogin: new Date().toISOString(),
        }

        // Stockage des données d'authentification
        localStorage.setItem("adminToken", `technician-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`)
        localStorage.setItem("adminUser", JSON.stringify(technicianUser))

        // Redirection vers le tableau de bord technicien
        router.push("/technician")
      }
      // Vérification des identifiants pour les autres utilisateurs
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
    <>
      <AnimatedBackground />
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/90 shadow-lg rounded-lg p-8 backdrop-blur-sm">
            <div className="text-center mb-6">
              {/* Logo Tunisie Telecom */}
              <div className="flex justify-center mb-4">
                <img
                  src="https://www.vhv.rs/dpng/d/328-3285590_simple-mobile-logo-telecommunications-logonoidcom-tunisie-telecom-logo.png"
                  alt="Tunisie Telecom Logo"
                  className="h-24 w-auto object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-white">GSM Management</h2>
              <p className="text-gray-400">Connectez-vous à votre compte</p>
            </div>

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
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white pr-10"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
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

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>
                Utilisez <strong className="text-orange-400">ahmed/benali</strong> pour le compte technicien,{" "}
                <strong className="text-orange-400">nidhal/nsiri</strong> pour le compte manager ou{" "}
                <strong className="text-orange-400">yassine/tarkhani</strong> pour le compte administrateur
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
