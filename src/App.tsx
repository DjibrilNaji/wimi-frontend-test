import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { Layout } from "@/components/Layout/Layout"
import LoginPage from "@/pages/LoginPage"
import TodolistPage from "@/pages/TodolistPage"
import { ProtectedRoute } from "@/router/ProtectedRoute"
import { PublicRoute } from "@/router/PublicRoute"
import { routes } from "@/routes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.auth.login}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path={routes.todolist.list}
          element={
            <ProtectedRoute>
              <Layout pageTitle="Mes listes de tâches">
                <TodolistPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={routes.auth.login} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
