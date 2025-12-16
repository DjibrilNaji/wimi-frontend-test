import { useQuery } from "@tanstack/react-query"
import * as React from "react"
import { useNavigate } from "react-router-dom"

import { fetchTodoLists, fetchTodos } from "@/api/todos"
import AvatarComponent from "@/components/Avatar"
import { SidebarSkeleton } from "@/components/skeleton/SidebarSkeleton"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"
import { routes } from "@/routes"
import type { Todo, TodoList } from "@/types/todolist"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const { data: todoLists, isLoading: listsLoading } = useQuery<TodoList[]>({
    queryKey: ["todolists", user?.id],
    queryFn: () => fetchTodoLists(user!.id),
    enabled: !!user?.id
  })

  const { data: todos, isLoading: todosLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos
  })

  if (!user) return null

  if (listsLoading || todosLoading) return <SidebarSkeleton />

  const userTodos =
    todos?.filter((todo) => todoLists?.some((list) => list.id === todo.todoListId)) || []
  const completedCount = userTodos.filter((userTodo) => userTodo.completed).length
  const totalCount = userTodos.length
  const completionPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <Sidebar {...props} className="border-r border-gray-200">
      <SidebarHeader>
        <div className="flex flex-col items-center gap-3 p-4">
          <AvatarComponent
            image={user.avatar}
            userName={user.firstName}
            className="w-20 h-20 border-2 border-blue-500 shadow-sm"
          />

          <p className="text-lg font-semibold truncate">
            {user.firstName} {user.lastName}
          </p>

          <p className="text-sm text-gray-600">{user.role}</p>

          <div className="w-full mt-2">
            <div className="text-sm text-gray-500 mb-1">Progression globale</div>

            <Progress value={completionPercent} color="black" />

            <p className="text-xs text-gray-600 mt-1 text-right">{completionPercent}%</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mes listes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {todoLists?.map((list) => (
                <SidebarMenuItem key={list.id}>
                  <SidebarMenuButton asChild>
                    <button
                      title={list.title}
                      className="text-left px-3 py-2 rounded-md hover:bg-blue-100 transition-colors truncate"
                      onClick={() =>
                        navigate(routes.todolist.one(String(list.id)), {
                          state: { title: list.title }
                        })
                      }
                    >
                      {list.title}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="w-full hover:bg-red-50 text-red-600 border-red-400"
                  >
                    Déconnexion
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
