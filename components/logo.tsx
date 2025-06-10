import { Wrench } from "lucide-react"

type LogoProps = Readonly<{
  className?: string;
}>;


export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`bg-telco-500 text-white p-2 rounded-md ${className}`}>
      <Wrench className="h-full w-full" />
    </div>
  )
}
