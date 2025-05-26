"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
// import { toast } from "@/components/ui/use-toast"
import { CreditCard, Loader2, Lock, Shield, Smartphone, Banknote, CheckCircle, AlertCircle } from "lucide-react"

interface ReservationData {
  vuelo: string
  asiento: string
  pasajero: string
  correo: string
  telefono: string
  usarMillas: boolean
  total: string
}

export default function PaymentForm() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [reservationData, setReservationData] = useState<ReservationData | null>(null)
  const [formData, setFormData] = useState({
    cardNumber: "4242 4242 4242 4242", // Valores predeterminados para simplificar
    expiryDate: "12/25",
    cvv: "123",
    cardName: "Usuario Demo",
    email: "",
    phone: "",
  })

  useEffect(() => {
    // Obtener datos de la reserva desde localStorage
    const savedData = localStorage.getItem("reservationData")
    if (savedData) {
      const data = JSON.parse(savedData)
      setReservationData(data)
      setFormData((prev) => ({
        ...prev,
        email: data.correo,
        phone: data.telefono,
      }))
    } else {
      // Si no hay datos de reserva, redirigir al inicio
      router.push("/")
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Formatear número de tarjeta
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (formatted.length <= 19) {
        setFormData((prev) => ({ ...prev, [name]: formatted }))
      }
      return
    }

    // Formatear fecha de expiración
    if (name === "expiryDate") {
      const formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
      if (formatted.length <= 5) {
        setFormData((prev) => ({ ...prev, [name]: formatted }))
      }
      return
    }

    // Limitar CVV a 4 dígitos
    if (name === "cvv") {
      const formatted = value.replace(/\D/g, "")
      if (formatted.length <= 4) {
        setFormData((prev) => ({ ...prev, [name]: formatted }))
      }
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Simplificamos la validación directamente en el handleSubmit

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simplificamos la validación
    if (paymentMethod === "credit-card" && formData.cardNumber.trim() === "") {
      alert("Por favor ingresa un número de tarjeta válido")
      return
    }

    setIsProcessing(true)

    try {
      // Simular procesamiento de pago (más rápido)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simular éxito del pago
      // const reservationId = Math.random().toString(36).substring(2, 10).toUpperCase()

      // Limpiar datos de localStorage
      localStorage.removeItem("reservationData")

      alert("Pago procesado exitosamente. Tu reserva ha sido confirmada.")

      // Redirigir al inicio
      router.push("/payments/confirmation")
    } catch (error) {
      console.log(error);
      alert("Error en el pago. Inténtalo de nuevo.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!reservationData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
        <span className="ml-2">Cargando información de reserva...</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Formulario de Pago */}
      <div className="lg:col-span-2">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2 text-green-600" />
              Información de Pago Segura
            </CardTitle>
            <CardDescription>Tus datos están protegidos con encriptación SSL de 256 bits</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Métodos de Pago */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Método de Pago</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                      Tarjeta de Crédito/Débito
                    </Label>
                    <div className="flex space-x-2">
                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        VISA
                      </div>
                      <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        MC
                      </div>
                      <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">
                        AMEX
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors opacity-60">
                    <RadioGroupItem value="paypal" id="paypal" disabled />
                    <Smartphone className="h-5 w-5 text-gray-400" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer text-gray-400">
                      PayPal (Próximamente)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors opacity-60">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" disabled />
                    <Banknote className="h-5 w-5 text-gray-400" />
                    <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer text-gray-400">
                      Transferencia Bancaria (Próximamente)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Formulario de Tarjeta */}
              {paymentMethod === "credit-card" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="text-lg tracking-wider"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Fecha de Expiración</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/AA"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      placeholder="Nombre completo como aparece en la tarjeta"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              <Separator />

              {/* Información de Contacto */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Información de Contacto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Términos y Condiciones */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="mb-2">Al proceder con el pago, aceptas:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Los términos y condiciones de JetSystem</li>
                      <li>La política de cancelación y reembolsos</li>
                      <li>Las tarifas y cargos aplicables</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 py-6 text-lg font-semibold"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Procesando Pago...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Pagar ${reservationData.total}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Resumen de Reserva */}
      <div className="lg:col-span-1">
        <Card className="shadow-xl sticky top-8">
          <CardHeader>
            <CardTitle>Resumen de tu Reserva</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Vuelo:</span>
                <span className="font-medium">{reservationData.vuelo}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Pasajero:</span>
                <span className="font-medium">{reservationData.pasajero}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Asiento:</span>
                <span className="font-medium">{reservationData.asiento}</span>
              </div>

              {reservationData.usarMillas && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento por millas:</span>
                  <span>Aplicado</span>
                </div>
              )}
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total a Pagar:</span>
              <span className="text-sky-600">${reservationData.total}</span>
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <div className="text-sm">
                  <p className="font-medium text-green-800">Pago 100% Seguro</p>
                  <p className="text-green-600">Protegido por SSL</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Política de Cancelación</p>
                  <p className="text-blue-600">Reembolso del 80% hasta 7 días antes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
