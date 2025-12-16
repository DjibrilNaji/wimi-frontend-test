import { TodolistItem } from "@/components/Todos/TodoListItem"
import type { Todo } from "@/types/todolist"

type TodolistListProps = {
  todos: Todo[]
  onToggle: (todo: Todo) => void
}

export function TodolistList({ todos, onToggle }: TodolistListProps) {
  return (
    <div className="space-y-3 mt-4">
      {todos.map((todo) => (
        <TodolistItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </div>
  )
}
