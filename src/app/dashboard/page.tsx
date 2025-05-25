"use client"

// Importamos dynamic de next/dynamic
import dynamic from 'next/dynamic'
import { Suspense } from "react"
import { Loader2 } from "lucide-react" 
import ProtectedRoute from "@/components/protected-route"
import Navbar from "@/components/navbar"

// Cargamos el componente que contiene useSearchParams() de forma dinámica
// Esto evita el error de SSR con useSearchParams()
const DashboardContent = dynamic(() => import('@/components/dashboard-content'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center w-full h-64">
      <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
      <span className="ml-2">Cargando panel de control...</span>
    </div>
  ),
})

export default function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["customer", "corporate"]}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex pt-16">
          {/* Envolvemos el componente que usa useSearchParams en un Suspense */}
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-64">
                <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
                <span className="ml-2">Cargando...</span>
              </div>
            }
          >
            <DashboardContent />
          </Suspense>
        </div>
      </div>
    </ProtectedRoute>
  )
}
