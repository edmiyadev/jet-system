"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function RegistrationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    compania: "",
    telefono: "",
    correo: "",
    password: "",
    confirmPassword: "",
    tipoCliente: "minorista", // Por defecto es minorista
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tipoCliente: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección es requerida"
    }

    if (formData.tipoCliente === "corporativo" && !formData.compania.trim()) {
      newErrors.compania = "El nombre de la compañía es requerido para clientes corporativos"
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
    } else if (!/^\+?[0-9]{8,15}$/.test(formData.telefono)) {
      newErrors.telefono = "Ingrese un número de teléfono válido"
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo electrónico es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Ingrese un correo electrónico válido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para enviar los datos al servidor
      // Por ahora simulamos un registro exitoso
      await new Promise((resolve) => setTimeout(resolve, 1500))

    //   toast({
    //     title: "Registro exitoso",
    //     description: "Tu cuenta ha sido creada correctamente.",
    //   })

      // Redirigir al usuario a la página de inicio de sesión
      router.push("/auth/login")
    } catch (error) {
      console.log(error);
    //   toast({
    //     title: "Error en el registro",
    //     description: "Ha ocurrido un error al crear tu cuenta. Inténtalo de nuevo.",
    //     variant: "destructive",
    //   })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre completo</Label>
        <Input
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={errors.nombre ? "border-red-500" : ""}
        />
        {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="direccion">Dirección</Label>
        <Input
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          className={errors.direccion ? "border-red-500" : ""}
        />
        {errors.direccion && <p className="text-sm text-red-500">{errors.direccion}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="compania">
          Nombre de la compañía {formData.tipoCliente === "corporativo" && <span className="text-red-500">*</span>}
        </Label>
        <Input
          id="compania"
          name="compania"
          value={formData.compania}
          onChange={handleChange}
          className={errors.compania ? "border-red-500" : ""}
        />
        {errors.compania && <p className="text-sm text-red-500">{errors.compania}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono">Número de teléfono</Label>
        <Input
          id="telefono"
          name="telefono"
          type="tel"
          value={formData.telefono}
          onChange={handleChange}
          className={errors.telefono ? "border-red-500" : ""}
          placeholder="+1234567890"
        />
        {errors.telefono && <p className="text-sm text-red-500">{errors.telefono}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="correo">Correo electrónico</Label>
        <Input
          id="correo"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          className={errors.correo ? "border-red-500" : ""}
        />
        {errors.correo && <p className="text-sm text-red-500">{errors.correo}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? "border-red-500" : ""}
        />
        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
      </div>

      <div className="space-y-2">
        <Label>Tipo de cliente</Label>
        <RadioGroup defaultValue={formData.tipoCliente} onValueChange={handleRadioChange} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="minorista" id="minorista" />
            <Label htmlFor="minorista">Cliente Minorista</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="corporativo" id="corporativo" />
            <Label htmlFor="corporativo">Cliente Corporativo</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Procesando...
          </>
        ) : (
          "Registrarse"
        )}
      </Button>
    </form>
  )
}
