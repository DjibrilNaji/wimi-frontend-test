interface SegmentedButtonProps {
  options: {
    label: string
    value: string
  }[]
  value: string
  onChange: (value: string) => void
}

export function SegmentedButton({ options, value, onChange }: SegmentedButtonProps) {
  return (
    <div className="inline-flex rounded-xl gap-1">
      {options.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              px-4 py-2 text-sm font-medium rounded-lg transition-all
              focus:outline-none cursor-pointer
              ${
                isActive
                  ? "bg-background text-foreground shadow ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60"
              }
            `}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
