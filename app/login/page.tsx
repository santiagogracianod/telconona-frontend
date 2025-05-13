import { LoginForm } from "@/components/login-form"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-telco-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo className="h-12 w-12" />
          <h1 className="text-2xl font-bold text-telco-800">TelcoNova</h1>
          <p className="text-sm text-muted-foreground">Ingresa a tu cuenta para gestionar órdenes</p>
        </div>
        <div className="bg-telco-500 text-white p-4 rounded-t-md -mx-8 -mt-8 mb-6">
          <h2 className="text-xl font-semibold text-center">Inicia sesión</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
