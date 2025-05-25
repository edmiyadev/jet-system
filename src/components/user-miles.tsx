"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Gift, Plane, TrendingUp } from "lucide-react"

// Datos de ejemplo para las millas del usuario
const userMiles = {
  total: 12500,
  available: 10000,
  used: 2500,
  nextTier: 15000,
  tier: "Silver",
  history: [
    {
      id: 1,
      date: "2023-05-15",
      description: "Vuelo SDQ-MIA",
      miles: 1500,
      type: "earned",
    },
    {
      id: 2,
      date: "2023-04-22",
      description: "Vuelo MIA-JFK",
      miles: 2000,
      type: "earned",
    },
    {
      id: 3,
      date: "2023-03-10",
      description: "Vuelo JFK-SDQ",
      miles: 2500,
      type: "earned",
    },
    {
      id: 4,
      date: "2023-02-28",
      description: "Descuento en reserva",
      miles: -2500,
      type: "used",
    },
    {
      id: 5,
      date: "2023-01-15",
      description: "Vuelo SDQ-PTY",
      miles: 1500,
      type: "earned",
    },
    {
      id: 6,
      date: "2022-12-20",
      description: "Bono por cliente frecuente",
      miles: 5000,
      type: "earned",
    },
  ],
}

export default function UserMiles() {
  const progress = (userMiles.total / userMiles.nextTier) * 100

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Millas Disponibles</CardTitle>
            <CardDescription>Millas que puedes usar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-sky-600 mr-2" />
              <span className="text-3xl font-bold">{userMiles.available.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Millas Totales</CardTitle>
            <CardDescription>Millas acumuladas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-sky-600 mr-2" />
              <span className="text-3xl font-bold">{userMiles.total.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Nivel Actual</CardTitle>
            <CardDescription>Nivel de cliente frecuente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <Plane className="h-5 w-5 text-sky-600 mr-2" />
              <span className="text-3xl font-bold">{userMiles.tier}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso al siguiente nivel</span>
                <span>
                  {userMiles.total.toLocaleString()} / {userMiles.nextTier.toLocaleString()}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Programa de Millas</CardTitle>
          <CardDescription>
            Como cliente corporativo, acumulas millas en cada vuelo que puedes usar para obtener descuentos en futuras
            reservas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="history">
            <TabsList className="mb-4">
              <TabsTrigger value="history">Historial</TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-3 border-b bg-gray-50 font-medium">
                  <div>Fecha</div>
                  <div className="col-span-2">Descripción</div>
                  <div className="text-right">Millas</div>
                </div>

                <div className="divide-y">
                  {userMiles.history.map((item) => (
                    <div key={item.id} className="grid grid-cols-4 p-3">
                      <div className="text-gray-600">{item.date}</div>
                      <div className="col-span-2">{item.description}</div>
                      <div
                        className={`text-right font-medium ${
                          item.type === "earned" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.type === "earned" ? "+" : ""}
                        {item.miles.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
