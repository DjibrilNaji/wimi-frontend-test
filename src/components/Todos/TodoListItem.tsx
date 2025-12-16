import { motion } from "framer-motion"
import { Calendar, Clock } from "lucide-react"

import { DeleteTodoDialog } from "@/components/Todos/DeleteTodoDialog"
import { EditTodoDialog } from "@/components/Todos/EditTodoDialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { Todo } from "@/types/todolist"

interface TodolistItemProps {
  todo: Todo
  onToggle: (todo: Todo) => void
}

const priorityColors = {
  low: "bg-green-200 text-green-800",
  medium: "bg-yellow-200 text-yellow-800",
  high: "bg-red-200 text-red-800"
}

const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High"
}

export function TodolistItem({ todo, onToggle }: TodolistItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      key={todo.id}
      className="group border p-4 rounded-xl shadow transition-all duration-200 flex items-center gap-4"
    >
      <Input
        type="checkbox"
        onChange={() => onToggle(todo)}
        checked={todo.completed}
        className="w-4 h-4"
      />

      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <h3
            className={cn(
              "text-sm font-medium text-foreground transition-all duration-200",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.title}
          </h3>

          <span
            className={cn(
              "px-2 py-0.5 rounded-md text-xs font-medium",
              priorityColors[todo.priority]
            )}
          >
            {priorityLabels[todo.priority]}
          </span>
        </div>

        {todo.description && (
          <p
            className={cn(
              "text-sm text-muted-foreground line-clamp-2",
              todo.completed && "line-through"
            )}
          >
            {todo.description}
          </p>
        )}

        <div className="flex items-center gap-4 pt-1">
          {todo.dueDate && (
            <div className={cn("flex items-center gap-1.5 text-xs")}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>Created {new Date(todo.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="ml-auto flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <EditTodoDialog todo={todo} listId={todo.todoListId} />
        <DeleteTodoDialog listId={todo.todoListId} todoId={todo.id} />
      </div>
    </motion.div>
  )
}
