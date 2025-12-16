import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

import { addTodo, deleteTodo, fetchTodosByTodolistId, toggleTodo, updateTodo } from "@/api/todos"
import type { AddTaskFormValues, UpdateTaskFormValues } from "@/types/schema"
import type { Todo } from "@/types/todolist"

export type FilterStatus = "all" | "completed" | "in-progress"
export type SortOption = "priority" | "dueDate"

export function useTodos(listId: number) {
  const queryClient = useQueryClient()

  const [filter, setFilter] = useState<FilterStatus>("all")
  const [sort, setSort] = useState<SortOption>("priority")
  const [search, setSearch] = useState("")

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos", listId],
    queryFn: () => fetchTodosByTodolistId(listId)
  })

  const completedCount = todos.filter((t) => t.completed).length
  const completionPercent = todos.length ? Math.round((completedCount / todos.length) * 100) : 0

  const addTodoMutation = useMutation({
    mutationFn: (newTodo: AddTaskFormValues) => addTodo(newTodo, listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", listId] })
      toast.success("Task added")
    },
    onError: () => {
      toast.error("Error adding the task")
    }
  })

  const toggleTodoMutation = useMutation({
    mutationFn: (todo: Todo) => toggleTodo(todo.id, !todo.completed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos", listId] }),
    onError: () => {
      toast.error("Error updating the task status")
    }
  })

  const updateTodoMutation = useMutation({
    mutationFn: ({ todoId, updatedTodo }: { todoId: number; updatedTodo: UpdateTaskFormValues }) =>
      updateTodo(todoId, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", listId] })
      toast.success("Task updated")
    },
    onError: () => {
      toast.error("Error updating the task")
    }
  })

  const deleteTodoMutation = useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", listId] })
      toast.success("Task deleted")
    }
  })

  const filteredTodos = todos
    .filter((todo) => {
      if (!search.trim()) return true
      const q = search.toLowerCase()
      return todo.title.toLowerCase().includes(q) || todo.description?.toLowerCase().includes(q)
    })
    .filter((todo) => {
      if (filter === "completed") return todo.completed
      if (filter === "in-progress") return !todo.completed
      return true
    })
    .sort((a, b) => {
      if (sort === "priority") {
        const order = { high: 3, medium: 2, low: 1 }
        return order[b.priority] - order[a.priority]
      }
      if (sort === "dueDate") {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }

      return 0
    })

  return {
    todos: filteredTodos,
    isLoading,
    filter,
    setFilter,
    sort,
    setSort,
    search,
    setSearch,
    addTodoMutation,
    toggleTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
    completedCount,
    totalCount: todos.length,
    completionPercent
  }
}
