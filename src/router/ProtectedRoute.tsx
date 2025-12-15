import type { JSX } from "react"
import { Navigate } from "react-router-dom"

import { useAuth } from "@/hooks/useAuth"
import { routes } from "@/routes"

type ProtectedRouteProps = {
  children: JSX.Element
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={routes.auth.login} replace />
  }

  return children
}
