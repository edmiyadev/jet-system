"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

// Define los tipos de usuario
export type UserRole = "customer" | "corporate" | "admin"

// Estructura para los usuarios
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  company?: string
  address?: string
  phone?: string
  miles?: number
}

// Datos falsos de ejemplo
const mockUsers: User[] = [
  {
    id: "usr-1",
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    role: "customer",
    avatar: "JP",
    address: "Calle Principal #123, Ciudad",
    phone: "+1 234 567 890",
    miles: 2500,
  },
  {
    id: "usr-2",
    name: "María Rodríguez",
    email: "maria@empresa.com",
    role: "corporate",
    avatar: "MR",
    company: "Empresa ABC",
    address: "Av. Comercial #456, Ciudad",
    phone: "+1 987 654 321",
    miles: 10000,
  },
  {
    id: "usr-3",
    name: "Admin Sistema",
    email: "admin@jetsystem.com",
    role: "admin",
    avatar: "AS",
  }
]

// Estructura del contexto
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<User>
  logout: () => void
  isAuthenticated: boolean
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}

// Proveedor del contexto
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("jetsystem_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error al cargar el usuario desde localStorage:", error)
        localStorage.removeItem("jetsystem_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    setIsLoading(true)
    console.log(password);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Buscar usuario por email (en una app real verificaríamos password)
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    
    if (!foundUser) {
      setIsLoading(false)
      throw new Error("Credenciales incorrectas")
    }
    
    // Guardar usuario en localStorage
    localStorage.setItem("jetsystem_user", JSON.stringify(foundUser))
    setUser(foundUser)
    setIsLoading(false)
    return foundUser
  }

  const logout = () => {
    localStorage.removeItem("jetsystem_user")
    setUser(null)
    router.push("/")
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
