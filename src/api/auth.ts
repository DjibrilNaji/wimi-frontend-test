import type { User } from "@/types/user"

const API_URL = "http://localhost:3001/users"

export async function login(email: string, password: string): Promise<User> {
  const res = await fetch(`${API_URL}?email=${email}&password=${password}`)

  if (!res.ok) {
    throw new Error("An error occurred while logging in.")
  }

  const data = await res.json()

  if (data.length === 0) {
    throw new Error("Incorrect email or password.")
  }

  return data[0]
}
