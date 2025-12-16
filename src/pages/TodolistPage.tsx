import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ChevronRightIcon } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { addTodoList, fetchTodoLists, fetchTodos } from "@/api/todos"
import ErrorState from "@/components/ErrorState"
import { TodolistPageSkeleton } from "@/components/skeleton/TodolistPageSkeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Item, ItemActions, ItemContent, ItemTitle } from "@/components/ui/item"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/useAuth"
import { routes } from "@/routes"

export default function TodolistPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [newListTitle, setNewListTitle] = useState("")

  const {
    data: todoLists,
    isLoading: listsLoading,
    error: listsError
  } = useQuery({
    queryKey: ["todolists", user?.id],
    queryFn: () => fetchTodoLists(user!.id),
    enabled: !!user?.id
  })

  const {
    data: todos,
    isLoading: todosLoading,
    error: todosError
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos
  })

  const createListMutation = useMutation({
    mutationFn: (title: string) => addTodoList(title, user!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todolists", user?.id], exact: true })
      toast.success("List created successfully")
      setNewListTitle("")
    },
    onError: () => alert("Error creating the list")
  })

  if (listsLoading || todosLoading) return <TodolistPageSkeleton />
  if (listsError || todosError) return <ErrorState />

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex gap-2 justify-end w-full">
            <Input
              placeholder="Title of the new list"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={() => newListTitle.trim() && createListMutation.mutate(newListTitle)}>
              + New list
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {todoLists?.map((list, index) => {
            const listTodos = todos?.filter((todo) => todo.todoListId === list.id) || []
            const completedCount = listTodos.filter((todo) => todo.completed).length
            const completionPercent = listTodos.length
              ? Math.round((completedCount / listTodos.length) * 100)
              : 0

            return (
              <>
                <Item variant="outline" className="w-wrap" size="sm" asChild key={list.id}>
                  <motion.div
                    key={list.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`cursor-pointer hover:border-gray-400 hover:shadow-lg transition-all duration-200`}
                    onClick={() =>
                      navigate(routes.todolist.one(String(list.id)), {
                        state: { title: list.title }
                      })
                    }
                  >
                    <ItemContent className="flex gap-2 w-full">
                      <ItemTitle className="text-lg font-semibold w-full text-ellipsis truncate">
                        {list.title}
                      </ItemTitle>

                      <p className="text-sm text-gray-700 mb-2">
                        {completedCount}/{listTodos.length} tasks completed
                      </p>

                      <p className="text-sm text-gray-500 mb-2">
                        Created on: {new Date(list.createdAt).toLocaleDateString()}
                      </p>

                      <Progress value={completionPercent} color={list.color} />
                    </ItemContent>

                    <ItemActions>
                      <ChevronRightIcon className="size-4" />
                    </ItemActions>
                  </motion.div>
                </Item>
              </>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}
