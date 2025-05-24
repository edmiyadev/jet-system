"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Clock, Plane } from "lucide-react"

interface Flight {
  id: string
  origin: string
  originName: string
  destination: string
  destinationName: string
  departureDate: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  airline: string
  availableSeats: number
}

export function SearchResults({ flights, pasajeros = 1 }: { flights: Flight[]; pasajeros?: number }) {
  const router = useRouter()
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null)

  const handleSelectFlight = (flightId: string) => {
    setSelectedFlight(flightId)
    // En una aplicación real, aquí guardaríamos el vuelo seleccionado en el estado global
    // o en localStorage antes de redirigir
    router.push(`/flights/reserve?vuelo=${flightId}&pasajeros=${pasajeros}`)
  }

  if (flights.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No se encontraron vuelos</h3>
        <p className="text-gray-600">Intenta con diferentes fechas o destinos.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {flights.map((flight) => (
        <Card key={flight.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Salida</p>
                      <p className="text-xl font-bold">{flight.departureTime}</p>
                      <p className="text-sm">{flight.originName}</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center">
                      <p className="text-xs text-gray-500 mb-1">{flight.duration}</p>
                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <Plane className="h-4 w-4 text-sky-600 transform rotate-90" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{flight.departureDate}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">Llegada</p>
                      <p className="text-xl font-bold">{flight.arrivalTime}</p>
                      <p className="text-sm">{flight.destinationName}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                  <p className="text-2xl font-bold text-sky-600">${flight.price}</p>
                  <p className="text-sm text-gray-500 mb-2">por persona</p>
                  <Button onClick={() => handleSelectFlight(flight.id)} className="bg-sky-600 hover:bg-sky-700">
                    Seleccionar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Asientos disponibles: {flight.availableSeats}</span>
                </div>
                <div className="text-sm text-gray-600">{flight.airline}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
