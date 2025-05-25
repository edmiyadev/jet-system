"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { toast } from "@/components/ui/use-toast"
import { Edit, Eye, Search, Trash } from "lucide-react"

// Datos de ejemplo para los vuelos
const flights = [
  {
    id: "FL001",
    origin: "SDQ",
    originName: "Santo Domingo",
    destination: "MIA",
    destinationName: "Miami",
    departureDate: "2023-06-15",
    departureTime: "08:30",
    arrivalTime: "11:45",
    status: "scheduled",
    capacity: 120,
    booked: 45,
  },
  {
    id: "FL002",
    origin: "SDQ",
    originName: "Santo Domingo",
    destination: "JFK",
    destinationName: "Nueva York",
    departureDate: "2023-06-15",
    departureTime: "14:15",
    arrivalTime: "18:30",
    status: "scheduled",
    capacity: 180,
    booked: 132,
  },
  {
    id: "FL003",
    origin: "MIA",
    originName: "Miami",
    destination: "SDQ",
    destinationName: "Santo Domingo",
    departureDate: "2023-06-15",
    departureTime: "19:45",
    arrivalTime: "23:00",
    status: "scheduled",
    capacity: 120,
    booked: 98,
  },
  {
    id: "FL004",
    origin: "SDQ",
    originName: "Santo Domingo",
    destination: "PTY",
    destinationName: "Panamá",
    departureDate: "2023-06-16",
    departureTime: "07:30",
    arrivalTime: "09:45",
    status: "scheduled",
    capacity: 100,
    booked: 62,
  },
  {
    id: "FL005",
    origin: "SDQ",
    originName: "Santo Domingo",
    destination: "MAD",
    destinationName: "Madrid",
    departureDate: "2023-06-16",
    departureTime: "23:15",
    arrivalTime: "13:30",
    status: "scheduled",
    capacity: 220,
    booked: 175,
  },
]

export default function AdminFlights({ filter }: { filter?: string }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [flightToDelete, setFlightToDelete] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Filtrar vuelos según el parámetro filter
  const filteredFlights = flights
    .filter((flight) => {
      if (filter === "today") {
        return flight.departureDate === "2023-06-15" // Simulamos que hoy es 15/06/2023
      } else if (filter === "upcoming") {
        return flight.departureDate > "2023-06-15"
      }
      return true
    })
    .filter((flight) => {
      // Filtrar por término de búsqueda
      if (!searchTerm) return true

      const searchLower = searchTerm.toLowerCase()
      return (
        flight.id.toLowerCase().includes(searchLower) ||
        flight.origin.toLowerCase().includes(searchLower) ||
        flight.originName.toLowerCase().includes(searchLower) ||
        flight.destination.toLowerCase().includes(searchLower) ||
        flight.destinationName.toLowerCase().includes(searchLower)
      )
    })

  const handleDeleteFlight = async () => {
    if (!flightToDelete) return

    setIsProcessing(true)

    try {
      // Aquí iría la lógica para eliminar el vuelo en el servidor
      // Por ahora simulamos un proceso exitoso
      await new Promise((resolve) => setTimeout(resolve, 1500))

    //   toast({
    //     title: "Vuelo eliminado",
    //     description: `El vuelo ${flightToDelete} ha sido eliminado correctamente.`,
    //   })

      setFlightToDelete(null)
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "No se pudo eliminar el vuelo. Inténtalo de nuevo.",
    //     variant: "destructive",
    //   })
    console.log("Error al eliminar el vuelo:", error);
    
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar vuelos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ocupación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFlights.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No se encontraron vuelos
                </TableCell>
              </TableRow>
            ) : (
              filteredFlights.map((flight) => (
                <TableRow key={flight.id}>
                  <TableCell className="font-medium">{flight.id}</TableCell>
                  <TableCell>
                    {flight.originName} ({flight.origin})
                  </TableCell>
                  <TableCell>
                    {flight.destinationName} ({flight.destination})
                  </TableCell>
                  <TableCell>{flight.departureDate}</TableCell>
                  <TableCell>{flight.departureTime}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Programado
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-sky-600 h-2.5 rounded-full"
                          style={{ width: `${(flight.booked / flight.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">
                        {flight.booked}/{flight.capacity}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setFlightToDelete(flight.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Eliminar Vuelo</DialogTitle>
                            <DialogDescription>
                              ¿Estás seguro de que deseas eliminar este vuelo? Esta acción no se puede deshacer.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">Vuelo:</span>
                                <p className="font-medium">{flight.id}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Ruta:</span>
                                <p className="font-medium">
                                  {flight.origin} - {flight.destination}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500">Fecha:</span>
                                <p className="font-medium">{flight.departureDate}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Hora:</span>
                                <p className="font-medium">{flight.departureTime}</p>
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button variant="outline" onClick={() => setFlightToDelete(null)}>
                              Cancelar
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteFlight} disabled={isProcessing}>
                              {isProcessing ? "Procesando..." : "Eliminar Vuelo"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
