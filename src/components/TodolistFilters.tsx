import { Input } from "@/components//ui/input"
import { SegmentedButton } from "@/components/Todos/SegmentedButton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import type { FilterStatus, SortOption } from "@/hooks/useTodos"

type TodolistFiltersProps = {
  filter: FilterStatus
  setFilter: (v: FilterStatus) => void
  sort: SortOption
  setSort: (v: SortOption) => void
  search: string
  setSearch: (v: string) => void
}

export function TodolistFilters({
  filter,
  setFilter,
  setSort,
  search,
  setSearch
}: TodolistFiltersProps) {
  return (
    <div className="my-4 space-y-3">
      <Input
        placeholder="Search a task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex items-center justify-between">
        <div className="hidden md:inline-flex rounded-xl bg-muted p-1">
          <SegmentedButton
            value={filter}
            onChange={(v) => setFilter(v as FilterStatus)}
            options={[
              { label: "All", value: "all" },
              { label: "In Progress", value: "in-progress" },
              { label: "Completed", value: "completed" }
            ]}
          />
        </div>

        <div className="flex gap-2">
          <Select onValueChange={(v) => setFilter(v as FilterStatus)}>
            <SelectTrigger className="md:hidden">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="dueDate">Due Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
