import { Wrench } from "lucide-react"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`bg-telco-500 text-white p-2 rounded-md ${className}`}>
      <Wrench className="h-full w-full" />
    </div>
  )
}
