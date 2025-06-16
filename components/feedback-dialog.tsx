"use client"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle } from "lucide-react"

type Props = {
  open: boolean
  onOpenChange: (o:boolean)=>void
  title?: string
  description: string
  variant?: "success" | "error"
}

export function FeedbackDialog({
  open, onOpenChange, title = "Mensaje",
  description, variant = "success",
}: Props) {
  const Icon   = variant === "success" ? CheckCircle : AlertTriangle
  const colour = variant === "success" ? "text-emerald-600" : "text-red-600"

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-xs text-center space-y-4">
        <AlertDialogHeader className="flex flex-col items-center gap-2">
          <Icon className={`h-10 w-10 ${colour}`} />
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <Button className="w-full" onClick={()=>onOpenChange(false)}>Aceptar</Button>
      </AlertDialogContent>
    </AlertDialog>
  )
}
