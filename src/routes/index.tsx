import { createFileRoute } from '@tanstack/react-router'
import PasswordHasher from '../components/PasswordHasher'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-6">
      <PasswordHasher />
    </div>
  )
}
