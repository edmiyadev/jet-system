"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Plane } from "lucide-react"

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  
  return (
    <nav className="bg-white/80 backdrop-blur-md py-4 fixed w-full z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-sky-600" />
          <span className="text-xl font-bold text-sky-600">JetSystem</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center space-x-6 mr-4">
                <Link href="/flights/search" className="text-gray-700 hover:text-sky-600">
                  Vuelos
                </Link>
                
                {/* Panel específico según rol */}
                {user?.role === "admin" ? (
                  <Link href="/admin" className="text-gray-700 hover:text-sky-600 flex items-center">
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full mr-1.5">Admin</span>
                    Panel de Control
                  </Link>
                ) : (
                  <>
                    {user?.role === "corporate" && (
                      <Link href="/dashboard?tab=miles" className="text-gray-700 hover:text-sky-600">
                        Mis Millas
                      </Link>
                    )}
                    <Link href="/dashboard?tab=reservations" className="text-gray-700 hover:text-sky-600">
                      Mis Reservas
                    </Link>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Link href={user?.role === "admin" ? "/admin" : "/dashboard"}>
                  <div className="flex items-center space-x-2 border px-3 py-1.5 rounded-full bg-white hover:bg-gray-50 transition-colors">
                    <div className="h-6 w-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs">
                      {user?.avatar || user?.name?.substring(0, 2)}
                    </div>
                    <span className="text-sm font-medium hidden md:inline">{user?.name?.split(' ')[0]}</span>
                  </div>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                  className="bg-transparent hover:bg-red-50 border-red-200 hover:border-red-300 text-red-600 hover:text-red-700"
                >
                  Salir
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-sky-600 hover:text-sky-800 font-medium transition-colors cursor-pinter">
                    Iniciar Sesión
              </Link>
              <Link href="/auth/register" className=" cursor-pinter">
                <Button className="bg-sky-600 hover:bg-sky-700">Registrarse</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
