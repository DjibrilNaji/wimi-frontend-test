import type { ReactNode } from "react"

import { AppSidebar } from "@/components/Layout/Sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

interface LayoutProps {
  children: ReactNode
  pageTitle: string
}

export function Layout({ children, pageTitle }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b px-4 sticky top-0 bg-white z-10">
          <SidebarTrigger className="-ml-1" />

          <h1 className="text-lg font-semibold">{pageTitle}</h1>
        </header>

        <main className="flex-1 p-3 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
