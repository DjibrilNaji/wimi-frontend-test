import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import LoginPage from "@/pages/LoginPage"
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

        <Route path="*" element={<Navigate to={routes.auth.login} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
