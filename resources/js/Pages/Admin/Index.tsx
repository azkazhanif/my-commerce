import { StatCard } from '@/Components/Dashboard/StatCard';
import AdminLayout from '@/Layouts/AdminLayout';

const Index = () => {
    return (
        <AdminLayout title="Dashboard">
            <div className="space-y-8 p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        label="Total Sales"
                        value="$150,000"
                        icon="emerald"
                    />
                    <StatCard label="Total Orders" value="52,375" icon="blue" />
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
        </AdminLayout>
    );
};

export default Index;
