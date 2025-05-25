"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth, UserRole } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
    }

    if (!isLoading && isAuthenticated && allowedRoles && !allowedRoles.includes(user?.role as UserRole)) {
      // El usuario no tiene el rol requerido
      if (user?.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isLoading, isAuthenticated, user, router, allowedRoles])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
        <span className="ml-2">Verificando acceso...</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (allowedRoles && !allowedRoles.includes(user?.role as UserRole)) {
    return null
  }

  return <>{children}</>
}
