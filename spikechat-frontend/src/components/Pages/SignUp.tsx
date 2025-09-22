"use client"

import { useState } from "react"
import { useAuthStore } from "../../stores/authStore"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { SignUpData, signUpSchema } from "../../lib/schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { handleSignUp } from "../../lib/server/auth"
import { toast } from "sonner"

export const SignUpPage = () => {
  const [loading, setLoading] = useState(false)

  const setUser = useAuthStore(state => state.setUser)
  const router = useRouter()

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = async (values: SignUpData) => {
    setLoading(true)
    const response = await handleSignUp(values)

    if (response.error) {
      setLoading(false)
      toast.error(response.error.message, { position: "top-center" })

      return;
    }

    setUser(response.data.user)
    toast.success("Autenticado com sucesso!", { position: "top-center" })

    // Redirect to home
    router.push("/")
  }
}