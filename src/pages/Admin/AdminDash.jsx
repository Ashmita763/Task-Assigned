import { LayoutDashboard } from 'lucide-react'
import EmptyState from './EmptyState'
import PageHeader from './PageHeader'

export default function AdminDash() {
  return (
    <main className="min-w-0 p-6">
      <PageHeader
        eyebrow="Administration"
        title="Dashboard"
        description="Overview of your platform activity."
      />
      <EmptyState
        icon={LayoutDashboard}
        title="Dashboard data is not available yet"
        description="Platform metrics and recent activity will appear here when they are connected."
      />
    </main>
  )
}
