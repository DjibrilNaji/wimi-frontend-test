import { Skeleton } from "@/components/ui/skeleton"

export function SidebarSkeleton() {
  return (
    <div className="flex flex-col gap-8 p-8 animate-pulse h-full">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="w-28 h-28 rounded-full" />
        <Skeleton className="w-48 h-6 rounded-md" />
        <Skeleton className="w-40 h-5 rounded-md" />
        <Skeleton className="w-full h-6 rounded-md mt-4" />
      </div>

      <div className="flex flex-col gap-4 mt-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="w-full h-12 rounded-md" />
        ))}
      </div>

      <div className="mt-auto">
        <Skeleton className="w-full h-14 rounded-md" />
      </div>
    </div>
  )
}
