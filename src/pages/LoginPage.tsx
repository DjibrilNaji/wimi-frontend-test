import { LoginForm } from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-xl p-8 shadow-md border border-gray-200">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Connexion</h1>
          <p className="mt-2 text-sm text-gray-500">Accédez à votre Todolist </p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
