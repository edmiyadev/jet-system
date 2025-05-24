import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ReservationForm from "@/components/reservation-form"

// Esta función simula la obtención de detalles de un vuelo
async function getFlightDetails(flightId: string) {
  // Simulamos una llamada a la API con un retraso
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Datos de ejemplo para el vuelo
  const flights = {
    FL001: {
      id: "FL001",
      origin: "SDQ",
      originName: "Santo Domingo",
      destination: "MIA",
      destinationName: "Miami",
      departureDate: "2023-06-15",
      departureTime: "08:30",
      arrivalTime: "11:45",
      duration: "3h 15m",
      price: 199,
      airline: "JetSystem",
      availableSeats: 45,
      aircraft: "Boeing 737-800",
      seatMap: [
        { id: "1A", available: true, price: 30 },
        { id: "1B", available: true, price: 30 },
        { id: "1C", available: false, price: 30 },
        { id: "2A", available: true, price: 25 },
        { id: "2B", available: true, price: 25 },
        { id: "2C", available: true, price: 25 },
        { id: "3A", available: true, price: 20 },
        { id: "3B", available: true, price: 20 },
        { id: "3C", available: true, price: 20 },
        { id: "4A", available: true, price: 15 },
        { id: "4B", available: false, price: 15 },
        { id: "4C", available: true, price: 15 },
        { id: "5A", available: true, price: 10 },
        { id: "5B", available: true, price: 10 },
        { id: "5C", available: true, price: 10 },
      ],
    },
    FL002: {
      id: "FL002",
      origin: "SDQ",
      originName: "Santo Domingo",
      destination: "MIA",
      destinationName: "Miami",
      departureDate: "2023-06-15",
      departureTime: "14:15",
      arrivalTime: "17:30",
      duration: "3h 15m",
      price: 229,
      airline: "JetSystem",
      availableSeats: 32,
      aircraft: "Boeing 737-800",
      seatMap: [
        { id: "1A", available: true, price: 30 },
        { id: "1B", available: false, price: 30 },
        { id: "1C", available: true, price: 30 },
        { id: "2A", available: true, price: 25 },
        { id: "2B", available: true, price: 25 },
        { id: "2C", available: true, price: 25 },
        { id: "3A", available: false, price: 20 },
        { id: "3B", available: true, price: 20 },
        { id: "3C", available: true, price: 20 },
        { id: "4A", available: true, price: 15 },
        { id: "4B", available: true, price: 15 },
        { id: "4C", available: true, price: 15 },
        { id: "5A", available: true, price: 10 },
        { id: "5B", available: true, price: 10 },
        { id: "5C", available: false, price: 10 },
      ],
    },
    FL003: {
      id: "FL003",
      origin: "SDQ",
      originName: "Santo Domingo",
      destination: "MIA",
      destinationName: "Miami",
      departureDate: "2023-06-15",
      departureTime: "19:45",
      arrivalTime: "23:00",
      duration: "3h 15m",
      price: 179,
      airline: "JetSystem",
      availableSeats: 18,
      aircraft: "Boeing 737-800",
      seatMap: [
        { id: "1A", available: false, price: 30 },
        { id: "1B", available: true, price: 30 },
        { id: "1C", available: true, price: 30 },
        { id: "2A", available: true, price: 25 },
        { id: "2B", available: false, price: 25 },
        { id: "2C", available: true, price: 25 },
        { id: "3A", available: true, price: 20 },
        { id: "3B", available: true, price: 20 },
        { id: "3C", available: false, price: 20 },
        { id: "4A", available: true, price: 15 },
        { id: "4B", available: true, price: 15 },
        { id: "4C", available: true, price: 15 },
        { id: "5A", available: false, price: 10 },
        { id: "5B", available: true, price: 10 },
        { id: "5C", available: true, price: 10 },
      ],
    },
  }

  return flights[flightId as keyof typeof flights] || null
}

export default async function ReservationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const flightId = typeof searchParams.vuelo === "string" ? searchParams.vuelo : undefined

  if (!flightId) {
    notFound()
  }

  const flightDetails = await getFlightDetails(flightId)

  if (!flightDetails) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/flights/search" className="mr-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Reserva de Vuelo</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Detalles del Vuelo</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600">Vuelo</p>
            <p className="font-medium">
              {flightDetails.airline} - {flightDetails.id}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Fecha</p>
            <p className="font-medium">{flightDetails.departureDate}</p>
          </div>
          <div>
            <p className="text-gray-600">Origen</p>
            <p className="font-medium">
              {flightDetails.originName} ({flightDetails.origin})
            </p>
          </div>
          <div>
            <p className="text-gray-600">Destino</p>
            <p className="font-medium">
              {flightDetails.destinationName} ({flightDetails.destination})
            </p>
          </div>
          <div>
            <p className="text-gray-600">Salida</p>
            <p className="font-medium">{flightDetails.departureTime}</p>
          </div>
          <div>
            <p className="text-gray-600">Llegada</p>
            <p className="font-medium">{flightDetails.arrivalTime}</p>
          </div>
          <div>
            <p className="text-gray-600">Duración</p>
            <p className="font-medium">{flightDetails.duration}</p>
          </div>
          <div>
            <p className="text-gray-600">Aeronave</p>
            <p className="font-medium">{flightDetails.aircraft}</p>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
            <span className="ml-2">Cargando formulario de reserva...</span>
          </div>
        }
      >
        <ReservationForm flight={flightDetails} />
      </Suspense>
    </div>
  )
}
