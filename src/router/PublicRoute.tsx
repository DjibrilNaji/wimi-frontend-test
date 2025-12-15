import type { JSX } from "react"
import { Navigate } from "react-router-dom"

import { useAuth } from "@/hooks/useAuth"
import { routes } from "@/routes"

type PublicRouteProps = {
  children: JSX.Element
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={routes.todolist.list} replace />
  }

  return children
}
