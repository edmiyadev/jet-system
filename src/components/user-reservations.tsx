"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, Calendar, Plane } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

// Datos de ejemplo para las reservas del usuario según su rol
const customerReservations = [
  {
    id: "RES123456",
    flightId: "FL001",
    origin: "SDQ",
    originName: "Santo Domingo",
    destination: "MIA",
    destinationName: "Miami",
    departureDate: "2023-06-15",
    departureTime: "08:30",
    arrivalTime: "11:45",
    seatNumber: "3B",
    status: "confirmed",
    passengerName: "Juan Pérez",
    price: 320,
  },
  {
    id: "RES789012",
    flightId: "FL002",
    origin: "MIA",
    originName: "Miami",
    destination: "SDQ",
    destinationName: "Santo Domingo",
    departureDate: "2023-06-20",
    departureTime: "14:15",
    arrivalTime: "17:30",
    seatNumber: "12C",
    status: "confirmed",
    passengerName: "Juan Pérez",
    price: 340,
  },
]

const corporateReservations = [
  {
    id: "RES123456",
    flightId: "FL001",
    origin: "MEX",
    originName: "Ciudad de México",
    destination: "BOG",
    destinationName: "Bogotá",
    departureDate: "2023-06-15",
    departureTime: "08:30",
    arrivalTime: "11:45",
    seatNumber: "1A",
    status: "confirmed",
    passengerName: "María Rodríguez",
    price: 520,
    company: "Empresa ABC",
  },
  {
    id: "RES789012",
    flightId: "FL002",
    origin: "BOG",
    originName: "Bogotá",
    destination: "MEX",
    destinationName: "Ciudad de México",
    departureDate: "2023-06-20",
    departureTime: "14:15",
    arrivalTime: "17:30",
    seatNumber: "1B",
    status: "confirmed",
    passengerName: "María Rodríguez",
    price: 540,
    company: "Empresa ABC",
  },
  {
    id: "RES345678",
    flightId: "FL003",
    origin: "MEX",
    originName: "Ciudad de México",
    destination: "MAD",
    destinationName: "Madrid",
    departureDate: "2023-07-10",
    departureTime: "23:30",
    arrivalTime: "16:45",
    seatNumber: "2A",
    status: "confirmed",
    passengerName: "María Rodríguez",
    price: 1200,
    company: "Empresa ABC",
  },
]

export default function UserReservations() {
  const [isCancelling, setIsCancelling] = useState(false)
  const [cancellationId, setCancellationId] = useState<string | null>(null)
  const { user } = useAuth()

  // Seleccionar las reservas según el rol del usuario
  const reservations = user?.role === "corporate" ? corporateReservations : customerReservations

  const handleCancelReservation = async (id: string) => {
    setCancellationId(id)
    setIsCancelling(true)
    console.log(cancellationId);
    
    try {
      // Simular el proceso de cancelación
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simular éxito
      alert("Reservación cancelada exitosamente.")
    } catch (error) {
      console.log(error);
      
      alert("Error al cancelar la reservación. Inténtalo de nuevo.")
    } finally {
      setIsCancelling(false)
      setCancellationId(null)
    }
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No tienes reservas</h3>
        <p className="text-gray-600 mb-6">Aún no has realizado ninguna reserva de vuelo.</p>
        <Link href="/vuelos">
          <Button className="bg-sky-600 hover:bg-sky-700">Buscar Vuelos</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Mis Reservas</h2>

      {reservations.map((reservation) => (
        <Card key={reservation.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        reservation.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {reservation.status === "confirmed" ? "Confirmado" : "Completado"}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">Reserva #{reservation.id}</span>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Salida</p>
                      <p className="text-xl font-bold">{reservation.departureTime}</p>
                      <p className="text-sm">{reservation.originName}</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center">
                      <p className="text-xs text-gray-500 mb-1">{reservation.departureDate}</p>
                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <Plane className="h-4 w-4 text-sky-600 transform rotate-90" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Asiento {reservation.seatNumber}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">Llegada</p>
                      <p className="text-xl font-bold">{reservation.arrivalTime}</p>
                      <p className="text-sm">{reservation.destinationName}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                  <p className="text-2xl font-bold text-sky-600">${reservation.price}</p>

                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>

                    {reservation.status === "confirmed" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                            onClick={() => {
                              setCancellationId(reservation.id)
                            }}
                          >
                            Cancelar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="flex items-center">
                              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                              Cancelar Reserva
                            </DialogTitle>
                            <DialogDescription>
                              ¿Estás seguro de que deseas cancelar esta reserva? Recibirás un reembolso del 80% del
                              valor pagado.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">Reserva:</span>
                                <p className="font-medium">{reservation.id}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Vuelo:</span>
                                <p className="font-medium">{reservation.flightId}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Origen:</span>
                                <p className="font-medium">{reservation.originName}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Destino:</span>
                                <p className="font-medium">{reservation.destinationName}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Fecha:</span>
                                <p className="font-medium">{reservation.departureDate}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Reembolso:</span>
                                <p className="font-medium text-green-600">${(reservation.price * 0.8).toFixed(2)}</p>
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button variant="outline" onClick={() => setCancellationId(null)}>
                              Cancelar
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleCancelReservation(reservation.id)}
                              disabled={isCancelling}
                            >
                              {isCancelling ? "Procesando..." : "Confirmar Cancelación"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
