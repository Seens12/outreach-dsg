import { create } from 'zustand'

export type ViewId =
  // Main
  | 'dashboard'
  | 'campaigns'
  | 'inbox'
  | 'leads'
  | 'prospects'
  // Resources
  | 'team'
  | 'knowledge-base'
  // Settings
  | 'mailboxes'
  | 'domains'
  | 'templates'
  // Tracking
  | 'calendar'
  | 'activity'
  // Analytics
  | 'analytics'
  | 'reports'
  // Integrations
  | 'webhooks'
  | 'crm'
  | 'ab-testing'
  // Account
  | 'notifications'
  | 'billing'
  | 'security'
  | 'settings'
  // Support
  | 'ai-demo'
  | 'help'
  // Auth
  | 'login'
  | 'register'
  | 'forgot-password'
  // Admin
  | 'admin'
  | 'admin-tenants'
  | 'admin-users'
  | 'admin-system'
  | 'admin-logs'
  | 'admin-billing'

export type AppMode = 'chat' | 'expanded'

interface AppState {
  view: ViewId
  mode: AppMode
  sidebarOpen: boolean
  setView: (view: ViewId) => void
  setMode: (mode: AppMode) => void
  toggleSidebar: () => void
}

export const useAppStore = create<AppState>((set) => ({
  view: 'dashboard',
  mode: 'chat',
  sidebarOpen: true,
  setView: (view) => set({ view, mode: 'expanded' }),
  setMode: (mode) => set({ mode }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}))

export const viewMeta: Record<ViewId, { title: string; group?: string }> = {
  dashboard: { title: 'Обзор', group: 'Основное' },
  campaigns: { title: 'Кампании', group: 'Основное' },
  inbox: { title: 'Входящие', group: 'Основное' },
  leads: { title: 'Лиды', group: 'Основное' },
  prospects: { title: 'Контакты', group: 'Основное' },
  team: { title: 'Команда', group: 'Ресурсы' },
  'knowledge-base': { title: 'База знаний', group: 'Ресурсы' },
  mailboxes: { title: 'Ящики', group: 'Настройка' },
  domains: { title: 'Домены', group: 'Настройка' },
  templates: { title: 'Шаблоны', group: 'Настройка' },
  calendar: { title: 'Календарь', group: 'Отслеживание' },
  activity: { title: 'Активность', group: 'Отслеживание' },
  analytics: { title: 'Аналитика', group: 'Аналитика' },
  reports: { title: 'Отчёты', group: 'Аналитика' },
  webhooks: { title: 'Вебхуки', group: 'Интеграции' },
  crm: { title: 'CRM', group: 'Интеграции' },
  'ab-testing': { title: 'A/B Тесты', group: 'Интеграции' },
  notifications: { title: 'Уведомления', group: 'Аккаунт' },
  billing: { title: 'Биллинг', group: 'Аккаунт' },
  security: { title: 'Безопасность', group: 'Аккаунт' },
  settings: { title: 'Настройки', group: 'Аккаунт' },
  'ai-demo': { title: 'AI Демо', group: 'Поддержка' },
  help: { title: 'Помощь', group: 'Поддержка' },
  login: { title: 'Вход' },
  register: { title: 'Регистрация' },
  'forgot-password': { title: 'Восстановление пароля' },
  admin: { title: 'Администрирование', group: 'Админ' },
  'admin-tenants': { title: 'Тенанты', group: 'Админ' },
  'admin-users': { title: 'Пользователи', group: 'Админ' },
  'admin-system': { title: 'Система', group: 'Админ' },
  'admin-logs': { title: 'Логи', group: 'Админ' },
  'admin-billing': { title: 'Биллинг', group: 'Админ' },
}
