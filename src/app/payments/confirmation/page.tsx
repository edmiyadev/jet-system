import Link from "next/link"
import { CheckCircle, Download, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const reservationId = typeof searchParams.id === "string" ? searchParams.id : "UNKNOWN"

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold mb-4">¡Reserva Confirmada!</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-600 mb-4">
            Tu reserva ha sido confirmada. Hemos enviado los detalles a tu correo electrónico.
          </p>

          <div className="border-t border-b py-4 my-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Número de Reserva:</span>
              <span>{reservationId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Estado:</span>
              <span className="text-green-600">Confirmado</span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Recuerda que puedes cancelar tu reserva hasta una semana antes de la fecha de salida con un reembolso del
            80%.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Descargar Boleto
          </Button>

          <Link href="/" passHref>
            <Button className="flex items-center bg-sky-600 hover:bg-sky-700">
              <Home className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
