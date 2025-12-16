import { AlertTriangle, RefreshCcw } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { routes } from "@/routes"

export default function ErrorState() {
  const navigate = useNavigate()

  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center gap-4 text-muted-foreground">
      <AlertTriangle className="w-10 h-10 text-red-500" />

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Error</h2>
        <p className="text-sm">An error occurred. Please try again later.</p>
      </div>

      <div className="flex gap-2 mt-2">
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Retry
        </Button>

        <Button
          onClick={() => navigate(routes.home)}
          variant="outline"
          className="flex items-center gap-2"
        >
          Home
        </Button>
      </div>
    </div>
  )
}
