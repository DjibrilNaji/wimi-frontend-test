import { Progress } from "@/components/ui/progress"

type Props = {
  title: string
  completionPercent: number
  completedCount: number
  totalCount: number
}

export function TodolistHeader({ title, completionPercent, completedCount, totalCount }: Props) {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      <Progress value={completionPercent} color="black" />
      <p className="text-sm text-muted-foreground mt-1">
        {completedCount}/{totalCount} tasks completed ({completionPercent}%)
      </p>
    </div>
  )
}
