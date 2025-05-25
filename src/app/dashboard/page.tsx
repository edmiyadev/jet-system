"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { Loader2, Plane, User, CreditCard, Calendar, LogOut, AlertTriangle } from "lucide-react"
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
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasActiveReservations, setHasActiveReservations] = useState(false) // Simulamos que tiene reservas activas

  const handleDeleteAccount = async () => {
    setIsDeleting(true)

    try {
      // Aquí iría la lógica para verificar si el usuario tiene reservas activas
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulamos el caso C donde el usuario tiene reservas activas
      if (hasActiveReservations) {
        alert("No es posible eliminar su cuenta mientras tenga una reservación activa.");
        setIsDeleting(false);
        return
      }

      // Simulamos la eliminación exitosa de la cuenta
      alert("Cuenta eliminada exitosamente.");

      // Redirigir al usuario a la página principal
      router.push("/")
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Ha ocurrido un error al intentar eliminar la cuenta.",
    //     variant: "destructive",
    //   })
    } finally {
      setIsDeleting(false)
    }
  }
    
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-white border-r h-screen fixed">
          <div className="p-6 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-sky-600" />
              <span className="text-xl font-bold text-sky-600">AeroRegional</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-2 p-3 rounded-md bg-sky-50 text-sky-700">
              <User className="h-5 w-5" />
              <span>Mi Perfil</span>
            </Link>
            <Link
              href="/dashboard/reservas"
              className="flex items-center space-x-2 p-3 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Calendar className="h-5 w-5" />
              <span>Mis Reservas</span>
            </Link>
            <Link
              href="/dashboard/millas"
              className="flex items-center space-x-2 p-3 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <CreditCard className="h-5 w-5" />
              <span>Mis Millas</span>
            </Link>
          </nav>

          <div className="p-4 border-t">
            <Button variant="outline" className="w-full flex items-center justify-center">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64">
          <header className="bg-white border-b p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Mi Cuenta</h1>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Juan Pérez</span>
                <div className="h-8 w-8 rounded-full bg-sky-600 text-white flex items-center justify-center">JP</div>
              </div>
            </div>
          </header>

          <main className="container mx-auto p-4 md:p-6">
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="reservations">Mis Reservas</TabsTrigger>
                <TabsTrigger value="miles">Mis Millas</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Información Personal</CardTitle>
                      <CardDescription>Gestiona tu información personal y preferencias</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Nombre</label>
                          <p className="font-medium">Juan Pérez</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Correo Electrónico</label>
                          <p className="font-medium">juan.perez@ejemplo.com</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Teléfono</label>
                          <p className="font-medium">+1 234 567 890</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Dirección</label>
                          <p className="font-medium">Calle Principal #123, Ciudad</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Tipo de Cliente</label>
                          <p className="font-medium">Corporativo</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Empresa</label>
                          <p className="font-medium">Empresa ABC</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button className="bg-sky-600 hover:bg-sky-700">Editar Información</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Zona de Peligro</CardTitle>
            <CardDescription>Estas acciones son permanentes y no se pueden deshacer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-red-200 rounded-md bg-red-50">
                <h3 className="text-lg font-medium text-red-800 mb-2">Eliminar Cuenta</h3>
                <p className="text-red-600 mb-4">
                  Al eliminar tu cuenta, perderás acceso a todos tus datos, incluyendo historial de reservas y millas
                  acumuladas. Esta acción no se puede deshacer.
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Eliminar mi cuenta</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        Eliminar Cuenta
                      </DialogTitle>
                      <DialogDescription>
                        ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es permanente y no se puede
                        deshacer. Perderás acceso a todos tus datos, incluyendo historial de reservas y millas
                        acumuladas.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="bg-red-50 p-4 rounded-md text-red-800 text-sm">
                      <p>Al eliminar tu cuenta:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Perderás todas tus millas acumuladas</li>
                        <li>Tu historial de reservas será eliminado</li>
                        <li>No podrás recuperar tu cuenta</li>
                        <li>Las reservas activas deberán ser canceladas antes de eliminar la cuenta</li>
                      </ul>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>
                        Cancelar
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleting}>
                        {isDeleting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Procesando...
                          </>
                        ) : (
                          "Eliminar Cuenta"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
                </div>
              </TabsContent>

              <TabsContent value="reservations">
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
                      <span className="ml-2">Cargando reservas...</span>
                    </div>
                  }
                >
                  <UserReservations />
                </Suspense>
              </TabsContent>

              <TabsContent value="miles">
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
                      <span className="ml-2">Cargando información de millas...</span>
                    </div>
                  }
                >
                  <UserMiles />
                </Suspense>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}
