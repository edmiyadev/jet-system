import Link from "next/link"
import { ArrowLeft, Plane } from "lucide-react"
import RegistrationForm from "@/components/registration-form"

export default function RegistroPage() {
  return (
    <div className="flex  justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
      <div className="container mx-auto px-4 py-8">
        {/* Botón para volver atrás */}
        <div className="max-w-md mx-auto mb-4">
          <Link href="/" className="flex items-center text-sky-600 hover:text-sky-800 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Volver</span>
          </Link>
        </div>
        
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <Plane className="h-6 w-6 text-sky-600" />
            <span className="text-xl font-bold text-sky-600">JetSystem</span>
          </Link>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Crear una cuenta</h1>
            <RegistrationForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/auth/login" className="text-sky-600 hover:text-sky-800 font-medium">
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
