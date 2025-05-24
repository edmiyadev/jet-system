import Link from "next/link"
import { ArrowLeft, Plane } from "lucide-react"
import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Mitad izquierda: Imagen de fondo */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-50 to-sky-100 overflow-hidden md:justify-center md:items-center">
        <img 
          src="/img/login.png" 
          alt="Imagen de fondo" 
          className="object-cover h-10/12"
        />
      </div>

      {/* Mitad derecha: Formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-md">
          {/* Botón para volver atrás */}
          <div className="mb-6">
            <Link href="/" className="flex items-center text-sky-600 hover:text-sky-800 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Volver</span>
            </Link>
          </div>
        
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-600 opacity-5 z-0"></div>
              <div className="relative z-10 p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h1>
                  <p className="text-gray-600">Inicia sesión para gestionar tus vuelos</p>
                </div>

                <LoginForm />

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    ¿No tienes una cuenta?{" "}
                    <Link href="/registro" className="text-sky-600 hover:text-sky-800 font-medium">
                      Regístrate
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} JetSystem. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
