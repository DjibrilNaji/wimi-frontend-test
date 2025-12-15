import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type z from "zod"

import { login } from "@/api/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/hooks/useAuth"
import { routes } from "@/routes"
import { loginSchema, type LoginFormValues } from "@/types/schema"

export function LoginForm() {
  const navigate = useNavigate()
  const { login: loginUser } = useAuth()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const mutation = useMutation({
    mutationFn: ({ email, password }: LoginFormValues) => login(email, password),
    onSuccess: (user) => {
      loginUser(user)
      toast.success("Login successful!")
      navigate(routes.todolist.list)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })

  const handleLogin = (values: LoginFormValues) => {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-gray-700">Email address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-gray-700">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={mutation.isPending} className="mt-4 w-full">
          {mutation.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner />
              Logging in...
            </span>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>
    </Form>
  )
}
