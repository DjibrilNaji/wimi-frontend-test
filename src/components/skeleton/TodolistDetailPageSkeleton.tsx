import { Skeleton } from "@/components/ui/skeleton"

export function TodolistDetailSkeleton() {
  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col gap-6 animate-pulse">
      <Skeleton className="h-10 w-32 rounded-md" />

      <div className="flex flex-col gap-2 mt-2">
        <Skeleton className="h-8 w-3/5 rounded-md" />
        <Skeleton className="h-4 w-2/5 rounded-md" />
        <Skeleton className="h-3 w-full rounded-full mt-1" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Skeleton className="h-10 w-full max-w-xs rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <div className="flex flex-col gap-2 mt-4 border p-4 rounded-xl">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-1/2 rounded-md" />
        <Skeleton className="h-10 w-1/4 rounded-md" />
        <div className="flex justify-end gap-2 mt-2">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col gap-2 p-4 border rounded-xl">
            <Skeleton className="h-6 w-3/5 rounded-md" />
            <Skeleton className="h-4 w-2/5 rounded-md" />
            <Skeleton className="h-3 w-full rounded-full mt-1" />
          </div>
        ))}
      </div>
    </div>
  )
}
