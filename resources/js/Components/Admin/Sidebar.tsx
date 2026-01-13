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
                    active
                />
                <SidebarItem icon={<ShoppingCart size={20} />} label="Order" />
                <SidebarItem icon={<Package size={20} />} label="Products" />
                <SidebarItem
                    icon={<BarChart3 size={20} />}
                    label="Sales Report"
                />
                <SidebarItem icon={<Settings size={20} />} label="Setting" />
            </nav>

            <div className="border-t border-slate-100 p-4">
                <button className="flex w-full items-center gap-3 px-4 py-3 text-slate-500 transition-colors hover:text-emerald-600">
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};
