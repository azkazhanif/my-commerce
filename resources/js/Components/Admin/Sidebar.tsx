import { router, usePage } from '@inertiajs/react';
import {
    BarChart3,
    LayoutDashboard,
    LogOut,
    Package,
    Settings,
    ShoppingCart,
} from 'lucide-react';
import { SidebarItem } from './SidebarItem';

export const Sidebar = () => {
    const { url } = usePage();

    return (
        <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
            <div className="flex items-center gap-2 p-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white">
                    M
                </div>
                <span className="text-xl font-bold tracking-tight text-emerald-950">
                    MYCOMMERCE
                </span>
            </div>

            <nav className="flex-1 space-y-2 px-4">
                <SidebarItem
                    icon={<LayoutDashboard size={20} />}
                    label="Dashboard"
                    active={url === '/admin/dashboard'}
                    href="/admin/dashboard"
                />
                <SidebarItem
                    icon={<ShoppingCart size={20} />}
                    label="Order"
                    href="/admin/orders"
                    active={url === '/admin/orders'}
                />
                <SidebarItem
                    icon={<Package size={20} />}
                    label="Products"
                    active={url === '/admin/products'}
                    href="/admin/products"
                />
                <SidebarItem
                    icon={<BarChart3 size={20} />}
                    label="Sales Report"
                    active={url === '/admin/reports'}
                    href="/admin/reports"
                />
                <SidebarItem
                    icon={<Settings size={20} />}
                    label="Setting"
                    active={url === '/admin/settings'}
                    href="/admin/settings"
                />
            </nav>

            <div className="border-t border-slate-100 p-4">
                <button
                    onClick={() => router.post('/admin/logout')}
                    className="flex w-full items-center gap-3 px-4 py-3 text-slate-500 transition-colors hover:text-emerald-600"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};
