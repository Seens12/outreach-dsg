'use client'

import { lazy, Suspense, useEffect } from 'react'
import { useAppStore, type ViewId } from '@/lib/store'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Topbar } from '@/components/dashboard/Topbar'

// Lazy load all views
const views: Record<ViewId, React.LazyExoticComponent<() => JSX.Element>> = {
  dashboard: lazy(() => import('@/components/views/DashboardView')),
  campaigns: lazy(() => import('@/components/views/CampaignsView')),
  inbox: lazy(() => import('@/components/views/InboxView')),
  leads: lazy(() => import('@/components/views/LeadsView')),
  prospects: lazy(() => import('@/components/views/ProspectsView')),
  team: lazy(() => import('@/components/views/TeamView')),
  'knowledge-base': lazy(() => import('@/components/views/KnowledgeBaseView')),
  mailboxes: lazy(() => import('@/components/views/MailboxesView')),
  domains: lazy(() => import('@/components/views/DomainsView')),
  templates: lazy(() => import('@/components/views/TemplatesView')),
  calendar: lazy(() => import('@/components/views/CalendarView')),
  activity: lazy(() => import('@/components/views/ActivityView')),
  analytics: lazy(() => import('@/components/views/AnalyticsView')),
  reports: lazy(() => import('@/components/views/ReportsView')),
  webhooks: lazy(() => import('@/components/views/WebhooksView')),
  crm: lazy(() => import('@/components/views/CrmView')),
  'ab-testing': lazy(() => import('@/components/views/AbTestingView')),
  notifications: lazy(() => import('@/components/views/NotificationsView')),
  billing: lazy(() => import('@/components/views/BillingView')),
  security: lazy(() => import('@/components/views/SecurityView')),
  settings: lazy(() => import('@/components/views/SettingsView')),
  'ai-demo': lazy(() => import('@/components/views/AiDemoView')),
  help: lazy(() => import('@/components/views/HelpView')),
  login: lazy(() => import('@/components/auth/LoginView')),
  register: lazy(() => import('@/components/auth/RegisterView')),
  'forgot-password': lazy(() => import('@/components/auth/ForgotPasswordView')),
  admin: lazy(() => import('@/components/views/AdminView')),
  'admin-tenants': lazy(() => import('@/components/views/AdminTenantsView')),
  'admin-users': lazy(() => import('@/components/views/AdminUsersView')),
  'admin-system': lazy(() => import('@/components/views/AdminSystemView')),
  'admin-logs': lazy(() => import('@/components/views/AdminLogsView')),
  'admin-billing': lazy(() => import('@/components/views/AdminBillingView')),
}

const ChatViewLazy = lazy(() => import('@/components/views/ChatView'))

const authViews: Set<ViewId> = new Set(['login', 'register', 'forgot-password'])

function LoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#e8e8e8] border-t-[#0d0d0d] rounded-full animate-spin" />
        <span className="text-[13px] text-[#a8a8a8]">Загрузка...</span>
      </div>
    </div>
  )
}

export default function Home() {
  const { view, mode } = useAppStore()

  const isAuth = authViews.has(view)
  const isChat = mode === 'chat' && !isAuth

  useEffect(() => {
    document.body.style.overflow = isAuth ? 'auto' : 'hidden'
    return () => { document.body.style.overflow = 'hidden' }
  }, [isAuth])

  // Auth pages — full screen, no sidebar
  if (isAuth) {
    const ViewComponent = views[view]
    return (
      <Suspense fallback={<LoadingFallback />}>
        <ViewComponent />
      </Suspense>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Topbar />
        <main className="flex-1 overflow-hidden relative mx-auto w-full max-w-[1400px]">
          <Suspense fallback={<LoadingFallback />}>
            {isChat ? <ChatViewLazy /> : <>{(() => { const V = views[view]; return <V /> })()}</>}
          </Suspense>
        </main>
      </div>
    </div>
  )
}
