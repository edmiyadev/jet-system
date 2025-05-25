import { Suspense } from "react"
import Link from "next/link"
import { Loader2, Plane, Users, Calendar, Settings, LogOut, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminFlights from "@/components/admin-flights"

export default function AdminPage() {
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
            <Link href="/admin" className="flex items-center space-x-2 p-3 rounded-md bg-sky-50 text-sky-700">
              <Calendar className="h-5 w-5" />
              <span>Vuelos</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 p-3 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Users className="h-5 w-5" />
              <span>Usuarios</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 p-3 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" />
              <span>Configuración</span>
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
              <h1 className="text-xl font-bold">Panel de Administración</h1>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Admin</span>
                <div className="h-8 w-8 rounded-full bg-sky-600 text-white flex items-center justify-center">A</div>
              </div>
            </div>
          </header>

          <main className="container mx-auto p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestión de Vuelos</h2>

              <Button className="bg-sky-600 hover:bg-sky-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                Nuevo Vuelo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total de Vuelos</CardTitle>
                  <CardDescription>Vuelos activos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">24</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Reservas Hoy</CardTitle>
                  <CardDescription>Nuevas reservas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Ocupación</CardTitle>
                  <CardDescription>Promedio de ocupación</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">78%</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">Todos los Vuelos</TabsTrigger>
                <TabsTrigger value="today">Vuelos de Hoy</TabsTrigger>
                <TabsTrigger value="upcoming">Próximos Vuelos</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
                      <span className="ml-2">Cargando vuelos...</span>
                    </div>
                  }
                >
                  <AdminFlights />
                </Suspense>
              </TabsContent>

              <TabsContent value="today">
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
                      <span className="ml-2">Cargando vuelos de hoy...</span>
                    </div>
                  }
                >
                  <AdminFlights filter="today" />
                </Suspense>
              </TabsContent>

              <TabsContent value="upcoming">
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
                      <span className="ml-2">Cargando próximos vuelos...</span>
                    </div>
                  }
                >
                  <AdminFlights filter="upcoming" />
                </Suspense>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}
