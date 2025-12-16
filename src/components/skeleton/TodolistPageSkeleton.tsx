import { Skeleton } from "@/components/ui/skeleton"

export function TodolistPageSkeleton() {
  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Skeleton className="h-12 w-full max-w-xs rounded-md" />
        <Skeleton className="h-12 w-40 rounded-md" />
      </div>

      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col gap-2 p-4 border rounded-xl">
            <Skeleton className="h-6 w-3/5 rounded-md" />
            <Skeleton className="h-4 w-2/5 rounded-md" />
            <Skeleton className="h-4 w-1/3 rounded-md" />
            <Skeleton className="h-3 w-full rounded-full mt-2" />
          </div>
        ))}
      </div>
    </div>
  )
}
