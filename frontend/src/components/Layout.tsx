import { Outlet, Link, useLocation } from 'react-router-dom'
import Logout from './Logout'


export default function Layout() {
    const location = useLocation()

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="border-b px-6 py-3 flex items-center justify-between">
                <span className="font-semibold text-lg">CSV Analyzer</span>
                <div className="flex items-center gap-4">
                    <Link
                        to="/dashboard"
                        className={`text-sm ${location.pathname === '/dashboard' ? 'font-semibold' : 'text-muted-foreground'}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/history"
                        className={`text-sm ${location.pathname === '/history' ? 'font-semibold' : 'text-muted-foreground'}`}
                    >
                        History
                    </Link>
                    <Logout />
                </div>
            </nav>
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}