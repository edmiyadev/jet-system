"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
// import { toast } from "@/components/ui/use-toast"
import { Check, CreditCard, Loader2 } from "lucide-react"

interface Seat {
  id: string
  available: boolean
  price: number
}

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
  aircraft: string
  seatMap: Seat[]
}

export default function ReservationForm({ flight }: { flight: Flight }) {
  const router = useRouter()
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [useMiles, setUseMiles] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  })

  // Simulamos que el usuario es corporativo y tiene millas disponibles
  const isUserCorporate = true
  const availableMiles = 5000
  const milesDiscount = useMiles ? Math.min(50, availableMiles / 100) : 0 // $1 de descuento por cada 100 millas, máximo 50% del precio

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeat(seatId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // if (!selectedSeat) {
    //   toast({
    //     title: "Error",
    //     description: "Por favor selecciona un asiento para continuar.",
    //     variant: "destructive",
    //   })
    //   return
    // }

    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para enviar la reserva al servidor
      // Por ahora simulamos un proceso de reserva exitoso
      await new Promise((resolve) => setTimeout(resolve, 2000))

      //   toast({
      //     title: "Reserva exitosa",
      //     description: "Tu reserva ha sido confirmada. Hemos enviado los detalles a tu correo electrónico.",
      //   })

      // Redirigir al usuario a la página de confirmación
      router.push(`/reservas/confirmacion?id=${Math.random().toString(36).substring(2, 10)}`)
    } catch (error) {
      //   toast({
      //     title: "Error en la reserva",
      //     description: "Ha ocurrido un error al procesar tu reserva. Inténtalo de nuevo.",
      //     variant: "destructive",
      //   })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calcular el precio total (precio base + precio del asiento seleccionado)
  const selectedSeatPrice = selectedSeat ? flight.seatMap.find((seat) => seat.id === selectedSeat)?.price || 0 : 0
  const subtotal = flight.price + selectedSeatPrice
  const discount = useMiles ? (subtotal * milesDiscount) / 100 : 0
  const totalPrice = subtotal - discount

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Selección de Asiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Selecciona un asiento disponible:</p>

              <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-6">
                {flight.seatMap.map((seat) => (
                  <button
                    key={seat.id}
                    disabled={!seat.available}
                    onClick={() => handleSeatSelect(seat.id)}
                    className={`
                      p-3 rounded-md text-center relative
                      ${!seat.available
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : selectedSeat === seat.id
                          ? "bg-sky-600 text-white"
                          : "bg-white border border-gray-300 hover:border-sky-600"
                      }
                    `}
                  >
                    {seat.id}
                    {selectedSeat === seat.id && <Check className="absolute top-1 right-1 h-3 w-3" />}
                    <div className="text-xs mt-1">+${seat.price}</div>
                  </button>
                ))}
              </div>

              <div className="text-center text-sm text-gray-600">
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white border border-gray-300 mr-2"></div>
                    <span>Disponible</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-sky-600 mr-2"></div>
                    <span>Seleccionado</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-200 mr-2"></div>
                    <span>No disponible</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isUserCorporate && (
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Usar millas disponibles</p>
                      <p className="text-sm text-gray-500">
                        Tienes {availableMiles} millas disponibles (descuento máximo: {milesDiscount}%)
                      </p>
                    </div>
                    <Switch checked={useMiles} onCheckedChange={setUseMiles} />
                  </div>
                </div>
              )}


            </form>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Reserva</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Precio base</span>
              <span>${flight.price.toFixed(2)}</span>
            </div>

            {selectedSeat && (
              <div className="flex justify-between">
                <span>Asiento {selectedSeat}</span>
                <span>+${selectedSeatPrice.toFixed(2)}</span>
              </div>
            )}

            {useMiles && discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Descuento por millas ({milesDiscount}%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Impuestos y tasas</span>
              <span>Incluidos</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-gray-600">
            <p>
              Al completar esta reserva, aceptas nuestros términos y condiciones y política de cancelación. Las reservas
              pueden ser canceladas hasta una semana antes con un reembolso del 80%.
            </p>
          </CardFooter>

        </Card>
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 cursor-pointer"
            disabled={isSubmitting || !selectedSeat}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Completar Reserva
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
