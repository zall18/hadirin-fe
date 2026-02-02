import Sidebar from './components/Sidebar'
import Header from './components/Header'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
        <footer className="py-4 px-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} AdminPro Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}