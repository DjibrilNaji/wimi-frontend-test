export type TodoList = {
  id: number
  title: string
  userId: number
  color: string
  createdAt: string
}

export type Todo = {
  id: number
  title: string
  description?: string
  completed: boolean
  todoListId: number
  priority: "low" | "medium" | "high"
  dueDate?: string
  createdAt: string
}
