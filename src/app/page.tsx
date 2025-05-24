import Link from "next/link"
import { Plane, Star, Shield, Clock, Users, MapPin, ArrowRight } from "lucide-react"
import FlightSearch from "@/components/flight-search"
import FeaturedDestinations from "@/components/featured-destinations"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-sky-600 p-2 rounded-full">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">JetSystem</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="text-sky-600 hover:text-sky-800 font-medium transition-colors">
              Iniciar Sesión
            </Link>
            <Link href="/auth/register">
              <Button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background with image and gradient overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url("/img/header.jpg")',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400/60 via-sky-500/50 to-sky-700/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Vuela hacia tus
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Sueños
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Descubre el mundo con JetSystem. Vuelos cómodos, precios increíbles y destinos extraordinarios te
                esperan.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-white/80">Destinos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">1M+</div>
                  <div className="text-white/80">Pasajeros Felices</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">99.8%</div>
                  <div className="text-white/80">Puntualidad</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-white/80">Soporte</div>
                </div>
              </div>

              {/* Search Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">¿A dónde quieres volar hoy?</h2>
                <FlightSearch />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">¿Por qué elegir JetSystem?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Más que una aerolínea, somos tu compañero de viaje hacia experiencias inolvidables
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group text-center p-8 rounded-2xl hover:bg-sky-50 transition-all duration-300 hover:shadow-lg">
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-200 transition-colors">
                  <Star className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Experiencia Premium</h3>
                <p className="text-gray-600">
                  Servicio de primera clase en cada vuelo, desde el check-in hasta tu destino final.
                </p>
              </div>

              <div className="group text-center p-8 rounded-2xl hover:bg-sky-50 transition-all duration-300 hover:shadow-lg">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Seguridad Garantizada</h3>
                <p className="text-gray-600">
                  Los más altos estándares de seguridad y mantenimiento para tu tranquilidad.
                </p>
              </div>

              <div className="group text-center p-8 rounded-2xl hover:bg-sky-50 transition-all duration-300 hover:shadow-lg">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Siempre Puntual</h3>
                <p className="text-gray-600">
                  99.8% de puntualidad. Llegamos a tiempo para que no pierdas ni un momento.
                </p>
              </div>

              <div className="group text-center p-8 rounded-2xl hover:bg-sky-50 transition-all duration-300 hover:shadow-lg">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Atención Personalizada</h3>
                <p className="text-gray-600">Nuestro equipo está disponible 24/7 para hacer tu viaje perfecto.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-sky-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Destinos que te Enamorarán</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Desde playas paradisíacas hasta ciudades cosmopolitas, descubre el mundo con nosotros
              </p>
            </div>
            <FeaturedDestinations />

            <div className="text-center mt-12">
              <Link href="/destinos">
                <Button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Ver Todos los Destinos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Lo que Dicen Nuestros Pasajeros</h2>
              <p className="text-xl text-gray-600">Miles de viajeros confían en nosotros</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-sky-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Increíble experiencia de vuelo. El servicio fue excepcional y llegamos puntualmente. Definitivamente
                  volaré con JetSystem de nuevo."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sky-700 font-semibold">MR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">María Rodríguez</div>
                    <div className="text-gray-600 text-sm">Cliente Frecuente</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Los precios son muy competitivos y la calidad del servicio es excelente. Mi familia y yo siempre
                  elegimos JetSystem para nuestras vacaciones."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sky-700 font-semibold">CG</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Carlos García</div>
                    <div className="text-gray-600 text-sm">Viajero de Negocios</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-sky-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "El programa de millas es fantástico. He podido viajar gratis varias veces gracias a los puntos
                  acumulados. ¡Muy recomendado!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-sky-700 font-semibold">AL</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Ana López</div>
                    <div className="text-gray-600 text-sm">Cliente Corporativo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-sky-600 to-sky-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-600/90 to-sky-800/90"></div>
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">¿Listo para tu Próxima Aventura?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a más de 1 millón de viajeros que han elegido JetSystem para sus mejores experiencias de vuelo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registro" >
                <Button className="bg-white text-sky-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300  cursor-pointer">
                  Crear Cuenta Gratis
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="bg-sky-600 p-2 rounded-full">
                  <Plane className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">JetSystem</span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                Tu aerolínea regional de confianza. Conectamos destinos, creamos experiencias y hacemos realidad tus
                sueños de viaje.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Enlaces Rápidos</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/vuelos" className="text-gray-400 hover:text-white transition-colors">
                    Vuelos
                  </Link>
                </li>
                <li>
                  <Link href="/destinos" className="text-gray-400 hover:text-white transition-colors">
                    Destinos
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-gray-400 hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/registro" className="text-gray-400 hover:text-white transition-colors">
                    Registrarse
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Contacto</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Av. Principal #123, Ciudad
                </li>
                <li>📞 +1 234 567 890</li>
                <li>✉️ info@JetSystem.com</li>
                <li>🕒 24/7 Atención al Cliente</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} JetSystem. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terminos" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos y Condiciones
              </Link>
              <Link href="/privacidad" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/reembolsos" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Reembolsos
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
