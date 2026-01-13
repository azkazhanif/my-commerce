import { Head } from '@inertiajs/react';
import {
    BarChart3,
    Bell,
    LayoutDashboard,
    LogOut,
    Package,
    Search,
    Settings,
    ShoppingCart,
} from 'lucide-react'; // Example icons

const Index = () => {
    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
            <Head title="Dashboard Admin" />

            {/* --- SIDEBAR --- */}
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
                    <SidebarItem
                        icon={<ShoppingCart size={20} />}
                        label="Order"
                    />
                    <SidebarItem
                        icon={<Package size={20} />}
                        label="Products"
                    />
                    <SidebarItem
                        icon={<BarChart3 size={20} />}
                        label="Sales Report"
                    />
                    <SidebarItem
                        icon={<Settings size={20} />}
                        label="Setting"
                    />
                </nav>

                <div className="border-t border-slate-100 p-4">
                    <button className="flex w-full items-center gap-3 px-4 py-3 text-slate-500 transition-colors hover:text-emerald-600">
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/80 px-8 py-4 backdrop-blur-md">
                    <h1 className="text-2xl font-semibold text-slate-800">
                        Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <Search
                            className="cursor-pointer text-slate-400 hover:text-emerald-600"
                            size={20}
                        />
                        <Settings
                            className="cursor-pointer text-slate-400 hover:text-emerald-600"
                            size={20}
                        />
                        <Bell
                            className="cursor-pointer text-slate-400 hover:text-emerald-600"
                            size={20}
                        />
                        <img
                            src="https://ui-avatars.com/api/?name=Admin&background=059669&color=fff"
                            className="h-10 w-10 rounded-full border-2 border-emerald-100"
                        />
                    </div>
                </header>

                <div className="space-y-8 p-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            label="Total Sales"
                            value="$150,000"
                            icon="emerald"
                        />
                        <StatCard
                            label="Total Orders"
                            value="52,375"
                            icon="blue"
                        />
                        <StatCard
                            label="Total Visitors"
                            value="531,474"
                            icon="emerald"
                        />
                        <StatCard label="Live Visitors" value="4532" isLive />
                    </div>

                    {/* Chart Sections (Placeholder for your Chart.js/Recharts) */}
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 h-80 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 font-bold text-slate-700">
                                Total Revenue 2025
                            </h3>
                            <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                                Chart Area
                            </div>
                        </div>
                        <div className="col-span-1 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 font-bold text-slate-700">
                                Customer Volume
                            </h3>
                            <div className="flex h-full flex-col items-center justify-center">
                                <div className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-emerald-500 text-xl font-bold">
                                    +15%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const SidebarItem = ({ icon, label, active = false }) => (
    <div
        className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-all ${
            active
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
        }`}
    >
        {icon}
        <span className="font-medium">{label}</span>
    </div>
);

const StatCard = ({ label, value, icon, isLive = false }) => (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div
            className={`rounded-xl p-4 ${isLive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'}`}
        >
            <Package size={24} />
        </div>
        <div>
            <p className="text-sm font-medium text-slate-400">{label}</p>
            <h4 className="text-xl font-bold text-slate-800">{value}</h4>
        </div>
        {isLive && (
            <span className="ml-auto animate-pulse rounded bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                Live
            </span>
        )}
    </div>
);

export default Index;
