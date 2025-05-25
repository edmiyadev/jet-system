"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Loader2, User, CreditCard, Calendar, LogOut, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserReservations from "@/components/user-reservations"
import UserMiles from "@/components/user-miles"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardContent() {
  const { user, logout } = useAuth()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState('profile')
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasActiveReservations] = useState(false) // Simulamos que no tiene reservas activas

  // Establecer la pestaña activa basada en los parámetros de la URL
  if (tabParam === 'reservations' || tabParam === 'miles') {
    if (activeTab !== tabParam) {
      setActiveTab(tabParam)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (hasActiveReservations) {
        alert("No es posible eliminar su cuenta mientras tenga una reservación activa.")
        setIsDeleting(false)
        return
      }

      alert("Cuenta eliminada exitosamente.")
      logout()
    } catch (error) {
      console.error("Error al eliminar cuenta", error)
    } finally {
      setIsDeleting(false)
    }
  }
    
  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r h-[calc(100vh-4rem)] fixed">
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link 
            href="/dashboard"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center space-x-2 p-3 rounded-md ${
              activeTab === "profile" ? "bg-sky-50 text-sky-700" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <User className="h-5 w-5" />
            <span>Mi Perfil</span>
          </Link>
          <Link
            href="/dashboard?tab=reservations"
            onClick={() => setActiveTab("reservations")}
            className={`flex items-center space-x-2 p-3 rounded-md ${
              activeTab === "reservations" ? "bg-sky-50 text-sky-700" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span>Mis Reservas</span>
          </Link>
          {user?.role === "corporate" && (
            <Link
              href="/dashboard?tab=miles"
              onClick={() => setActiveTab("miles")}
              className={`flex items-center space-x-2 p-3 rounded-md ${
                activeTab === "miles" ? "bg-sky-50 text-sky-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <CreditCard className="h-5 w-5" />
              <span>Mis Millas</span>
            </Link>
          )}
        </nav>

        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 md:p-6 pt-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">Mi Cuenta</h1>
          <p className="text-gray-600">Gestiona tu información personal y reservas</p>
        </header>

        <main>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="reservations">Mis Reservas</TabsTrigger>
              {user?.role === "corporate" && (
                <TabsTrigger value="miles">Mis Millas</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Gestiona tu información personal y preferencias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Nombre</label>
                      <p className="font-medium">{user?.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Correo Electrónico</label>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Teléfono</label>
                      <p className="font-medium">{user?.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Dirección</label>
                      <p className="font-medium">{user?.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Tipo de Cliente</label>
                      <p className="font-medium">{user?.role === "corporate" ? "Corporativo" : "Minorista"}</p>
                    </div>
                    {user?.role === "corporate" && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Empresa</label>
                        <p className="font-medium">{user?.company}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <Button className="bg-sky-600 hover:bg-sky-700">Editar Información</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seguridad de la Cuenta</CardTitle>
                  <CardDescription>Actualiza tu contraseña y ajustes de seguridad</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Button variant="outline">Cambiar Contraseña</Button>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Eliminar Cuenta</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>¿Estás seguro de eliminar tu cuenta?</DialogTitle>
                        <DialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y todos los datos asociados.
                        </DialogDescription>
                      </DialogHeader>
                      {hasActiveReservations && (
                        <div className="flex items-center p-3 bg-amber-50 text-amber-700 rounded-md">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          <p className="text-sm">
                            Tienes reservaciones activas. Debes cancelarlas antes de poder eliminar tu cuenta.
                          </p>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {}}>Cancelar</Button>
                        <Button 
                          variant="destructive" 
                          onClick={handleDeleteAccount}
                          disabled={isDeleting || hasActiveReservations}
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Eliminando...
                            </>
                          ) : (
                            "Eliminar Cuenta"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reservations">
              <UserReservations />
            </TabsContent>

            {user?.role === "corporate" && (
              <TabsContent value="miles">
                <UserMiles />
              </TabsContent>
            )}
          </Tabs>
        </main>
      </div>
    </>
  )
}
