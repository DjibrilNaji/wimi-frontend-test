import type { Todo, TodoList } from "@/types/todolist"

const API_URL = "http://localhost:3001"

export async function fetchTodoLists(userId: number): Promise<TodoList[]> {
  const res = await fetch(`${API_URL}/todoLists?userId=${userId}`)
  if (!res.ok) throw new Error("Error fetching todo lists")
  return res.json()
}

export async function addTodoList(title: string, userId: number): Promise<TodoList> {
  const res = await fetch(`${API_URL}/todoLists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, userId, createdAt: new Date().toISOString() })
  })

  if (!res.ok) throw new Error("Error adding the list")
  return res.json()
}

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/todos`)
  if (!res.ok) throw new Error("Error fetching todos")
  return res.json()
}
