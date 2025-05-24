"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Filter } from "lucide-react"

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])

  const times = [
    { id: "morning", name: "Mañana (6:00 - 12:00)" },
    { id: "afternoon", name: "Tarde (12:00 - 18:00)" },
    { id: "evening", name: "Noche (18:00 - 0:00)" },
  ]

  const handleTimeChange = (timeId: string) => {
    setSelectedTimes((prev) => {
      if (prev.includes(timeId)) {
        return prev.filter((id) => id !== timeId)
      } else {
        return [...prev, timeId]
      }
    })
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
  }

  const handleReset = () => {
    setPriceRange([0, 1000])
    setSelectedTimes([])
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Rango de Precio</h3>
          <Slider
            defaultValue={priceRange}
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="my-6"
          />
          <div className="flex justify-between">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Horario de Salida</h3>
          <div className="space-y-2">
            {times.map((time) => (
              <div key={time.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`time-${time.id}`}
                  checked={selectedTimes.includes(time.id)}
                  onCheckedChange={() => handleTimeChange(time.id)}
                />
                <Label htmlFor={`time-${time.id}`}>{time.name}</Label>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={handleReset}>
          Restablecer Filtros
        </Button>
      </CardContent>
    </Card>
  )
}
