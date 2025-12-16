import { useLocation, useNavigate, useParams } from "react-router-dom"

import { TodolistDetailSkeleton } from "@/components/skeleton/TodolistDetailPageSkeleton"
import { TodolistFilters } from "@/components/TodolistFilters"
import AddTaskForm from "@/components/Todos/AddTaskForm"
import { TodolistHeader } from "@/components/Todos/TodolistHeader"
import { TodolistList } from "@/components/Todos/TodolistList"
import { Button } from "@/components/ui/button"
import { useTodos } from "@/hooks/useTodos"

export default function TodolistDetailPage() {
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()

  const listId = Number(id)

  const todosState = useTodos(listId)

  if (todosState.isLoading) return <TodolistDetailSkeleton />

  const filteredTodos = (todosState.todos ?? []).filter((todo) => {
    if (todosState.filter === "completed") return todo.completed
    if (todosState.filter === "in-progress") return !todo.completed
    return true
  })

  return (
    <>
      <Button className="mx-4" variant="outline" size="sm" onClick={() => navigate("/todolist")}>
        ← Back to lists
      </Button>

      <div className="p-4 max-w-4xl mx-auto">
        <TodolistHeader
          title={state?.title || `Task List #${listId}`}
          completionPercent={todosState.completionPercent}
          completedCount={todosState.completedCount}
          totalCount={todosState.totalCount}
        />

        <TodolistFilters {...todosState} />

        <AddTaskForm onAdd={todosState.addTodoMutation.mutate} />

        <TodolistList todos={filteredTodos} onToggle={todosState.toggleTodoMutation.mutate} />
      </div>
    </>
  )
}
