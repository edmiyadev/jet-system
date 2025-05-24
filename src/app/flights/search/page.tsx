import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"
import { SearchFilters } from "@/components/search-filters"
import { Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Esta función simula la búsqueda de vuelos en el servidor
async function searchFlights(origin?: string, destination?: string, date?: string) {
  // Simulamos una llamada a la API con un retraso
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulamos el caso donde no se encuentran vuelos para ciertos destinos
  if (destination === "BOG" || destination === "PTY") {
    return []
  }

  // Datos de ejemplo para vuelos
  return [
    {
      id: "FL001",
      origin: origin || "SDQ",
      originName: "Santo Domingo",
      destination: destination || "MIA",
      destinationName: "Miami",
      departureDate: date || "2023-06-15",
      departureTime: "08:30",
      arrivalTime: "11:45",
      duration: "3h 15m",
      price: 199,
      airline: "JetSystem",
      availableSeats: 45,
    },
    {
      id: "FL002",
      origin: origin || "SDQ",
      originName: "Santo Domingo",
      destination: destination || "MIA",
      destinationName: "Miami",
      departureDate: date || "2023-06-15",
      departureTime: "14:15",
      arrivalTime: "17:30",
      duration: "3h 15m",
      price: 229,
      airline: "JetSystem",
      availableSeats: 32,
    },
    {
      id: "FL003",
      origin: origin || "SDQ",
      originName: "Santo Domingo",
      destination: destination || "MIA",
      destinationName: "Miami",
      departureDate: date || "2023-06-15",
      departureTime: "19:45",
      arrivalTime: "23:00",
      duration: "3h 15m",
      price: 179,
      airline: "JetSystem",
      availableSeats: 18,
    },
  ]
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const origen = typeof params.origen === "string" ? params.origen : undefined
  const destino = typeof params.destino === "string" ? params.destino : undefined
  const fecha = typeof params.fecha === "string" ? params.fecha : undefined
  const pasajeros = typeof params.pasajeros === "string" ? params.pasajeros : "1"

  const flights = await searchFlights(origen, destino, fecha)
  const noResults = flights.length === 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Resultados de búsqueda</h1>
      </div>

      {noResults ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">No se encontraron vuelos</h2>
          <p className="text-gray-600 mb-6">
            No pudimos encontrar vuelos que coincidan con tu búsqueda. Por favor intenta con diferentes fechas o
            destinos.
          </p>
          <div className="flex justify-center">
            <Link href="/">
              <Button className="bg-sky-600 hover:bg-sky-700">Volver a buscar</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <SearchFilters />
          </div>

          <div className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
                  <span className="ml-2">Buscando vuelos...</span>
                </div>
              }
            >
              <SearchResults flights={flights} pasajeros={Number.parseInt(pasajeros)} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  )
}
