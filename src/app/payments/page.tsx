import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import PaymentForm from "@/components/payment-form"

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sky-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Completar Pago</h1>

          <Suspense
            fallback={
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
                <span className="ml-2">Cargando información de pago...</span>
              </div>
            }
          >
            <PaymentForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
