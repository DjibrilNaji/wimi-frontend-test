import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const addTaskSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"])
})

export type AddTaskFormValues = z.infer<typeof addTaskSchema>

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"])
})

export type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>
