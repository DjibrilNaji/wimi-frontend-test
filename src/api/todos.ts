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

export async function fetchTodosByTodolistId(todoListId: number): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/todos?todoListId=${todoListId}`)
  if (!res.ok) throw new Error("Error fetching todos for the list")
  return res.json()
}

export async function addTodo(todo: Partial<Todo>, todoListId: number): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...todo,
      completed: false,
      createdAt: new Date().toISOString(),
      todoListId
    })
  })

  if (!res.ok) throw new Error("Error adding the todo")
  return res.json()
}

export async function toggleTodo(id: number, completed: boolean): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed })
  })

  if (!res.ok) throw new Error("Error updating the todo")
  return res.json()
}

export async function updateTodo(id: number, todo: Partial<Todo>): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...todo })
  })

  if (!res.ok) throw new Error("Error updating the todo")
  return res.json()
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE"
  })
  if (!res.ok) throw new Error("Error deleting the todo")
  return
}
