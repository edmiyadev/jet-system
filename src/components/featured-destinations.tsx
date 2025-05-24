import Image from "next/image"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Miami",
    country: "Estados Unidos",
    image: "/img/card-miami.jpg",
    code: "MIA",
    price: "199",
    rating: 4.8,
    description: "Playas doradas y vida nocturna vibrante",
    popular: true,
  },
  {
    id: 2,
    name: "Nueva York",
    country: "Estados Unidos",
    image: "/img/card-new-york.jpg",
    code: "JFK",
    price: "299",
    rating: 4.9,
    description: "La ciudad que nunca duerme",
    popular: true,
  },
  {
    id: 3,
    name: "Madrid",
    country: "España",
    image: "/img/card-madrid.webp",
    code: "MAD",
    price: "499",
    rating: 4.7,
    description: "Arte, cultura y gastronomía excepcional",
    popular: false,
  },
  {
    id: 4,
    name: "Panamá",
    country: "Panamá",
    image: "/img/card-panama.webp",
    code: "PTY",
    price: "179",
    rating: 4.6,
    description: "Puente entre dos océanos",
    popular: false,
  },
  {
    id: 5,
    name: "Bogotá",
    country: "Colombia",
    image: "/img/card-bogota.jpg",
    code: "BOG",
    price: "229",
    rating: 4.5,
    description: "Capital cultural de Sudamérica",
    popular: false,
  },
  {
    id: 6,
    name: "Punta Cana",
    country: "República Dominicana",
    image: "/img/card-punta-cana.webp",
    code: "PUJ",
    price: "149",
    rating: 4.8,
    description: "Paraíso tropical caribeño",
    popular: true,
  },
]

export default function FeaturedDestinations() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((destination) => (
        <Link key={destination.id} href={`/vuelos/buscar?destino=${destination.code}`} className="group">
          <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
            {/* Popular badge */}
            {destination.popular && (
              <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
            )}

            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm opacity-90">{destination.country}</span>
              </div>

              <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
              <p className="text-sm opacity-90 mb-3">{destination.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>

                <div className="text-right">
                  <div className="text-sm opacity-75">Desde</div>
                  <div className="text-2xl font-bold">${destination.price}</div>
                </div>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-sky-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-sky-600 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                Ver Vuelos
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
