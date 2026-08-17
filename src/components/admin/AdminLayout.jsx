import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronLeft, FiLogOut, FiHome, FiPackage, FiShoppingBag, FiCreditCard, FiUsers, FiFileText, FiSettings, FiMessageSquare, FiGlobe } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
  { to: '/admin', icon: FiHome, label: 'Dashboard' },
  { to: '/admin/products', icon: FiPackage, label: 'Products' },
  { to: '/admin/orders', icon: FiShoppingBag, label: 'Orders' },
  { to: '/admin/payments', icon: FiCreditCard, label: 'Payments' },
  { to: '/admin/users', icon: FiUsers, label: 'Users' },
  { to: '/admin/complaints', icon: FiMessageSquare, label: 'Complaints' },
  { to: '/admin/audit', icon: FiFileText, label: 'Audit Log' },
  { to: '/admin/settings', icon: FiSettings, label: 'Settings' },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, adminData, logout } = useAuth();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <Link to="/admin" className="flex items-center gap-2 p-6 border-b border-gray-800">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange to-brand-red flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className="text-2xl font-black text-orange-500 tracking-wider">JAA Admin</span>
          </Link>

          <nav className="mt-6 px-4 space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition text-sm ${
                    active
                      ? 'bg-brand-orange text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-orange-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition text-sm"
          >
            <FiGlobe className="w-4 h-4" />
            <span>View Website</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-red-600/20 text-red-400 hover:text-red-300 transition text-sm"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm px-4 py-3 flex items-center gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <FiMenu className="w-5 h-5" />
          </button>
          <Link to="/admin" className="flex items-center gap-2 lg:hidden">
            <FiChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{adminData?.role?.replace('_', ' ') || 'Admin'}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-orange to-brand-red flex items-center justify-center text-white text-sm font-bold">
              {user?.email?.[0]?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
