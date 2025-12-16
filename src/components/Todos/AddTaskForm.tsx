import { zodResolver } from "@hookform/resolvers/zod"
import { CircleFadingPlus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { addTaskSchema, type AddTaskFormValues } from "@/types/schema"

interface AddTaskFormProps {
  onAdd: (values: AddTaskFormValues) => void
}

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [expanded, setExpanded] = useState(false)

  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      priority: "medium"
    }
  })

  const handleAddTodo = (values: AddTaskFormValues) => {
    onAdd(values)
    form.reset()
    setExpanded(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAddTodo)}
        className={`flex flex-col gap-2 overflow-hidden transition-all duration-300
          ${expanded ? "p-4 border rounded-xl" : ""}`}
      >
        <div className="flex items-center gap-2">
          <CircleFadingPlus className="shrink-0 text-muted-foreground" />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="New task..." {...field} onFocus={() => setExpanded(true)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div
          className={`flex flex-col gap-3 transition-all duration-300
            ${expanded ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"}`}
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset()
                setExpanded(false)
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
