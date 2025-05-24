"use client"

import type React from "react"

import { useState } from "react"
import { Search, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
// import { toast } from "@/components/ui/use-toast"

export default function FlightSearch() {
  const router = useRouter()
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [passengers, setPassengers] = useState("1")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // if (!origin || !destination || !departureDate) {
    //   toast({
    //     title: "Campos incompletos",
    //     description: "Por favor completa todos los campos requeridos.",
    //     variant: "destructive",
    //   })
    //   return
    // }

    // Redirect to search results page with query parameters
    router.push(`/flights/search?origen=${origin}&destino=${destination}&fecha=${departureDate}&pasajeros=${passengers}`)
  }

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
            Origen
          </label>
          <Select onValueChange={setOrigin} required>
            <SelectTrigger id="origin" className="w-full">
              <SelectValue placeholder="Selecciona origen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SDQ">Santo Domingo (SDQ)</SelectItem>
              <SelectItem value="STI">Santiago (STI)</SelectItem>
              <SelectItem value="PUJ">Punta Cana (PUJ)</SelectItem>
              <SelectItem value="LRM">La Romana (LRM)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
            Destino
          </label>
          <Select onValueChange={setDestination} required>
            <SelectTrigger id="destination" className="w-full">
              <SelectValue placeholder="Selecciona destino" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MIA">Miami (MIA)</SelectItem>
              <SelectItem value="JFK">Nueva York (JFK)</SelectItem>
              <SelectItem value="MAD">Madrid (MAD)</SelectItem>
              <SelectItem value="PTY">Panamá (PTY)</SelectItem>
              <SelectItem value="BOG">Bogotá (BOG)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="departure" className="block text-sm font-medium text-gray-700">
            Fecha de Salida
          </label>
          <div className="relative">
            <Input
              id="departure"
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
            Pasajeros
          </label>
          <div className="relative">
            <Select onValueChange={setPassengers} defaultValue="1">
              <SelectTrigger id="passengers" className="w-full pl-10">
                <SelectValue placeholder="Pasajeros" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Pasajero" : "Pasajeros"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex items-end pb-2.5">
          <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
            <Search className="mr-2 h-4 w-4" />
            Buscar Vuelos
          </Button>
        </div>
      </div>
    </form>
  )
}
