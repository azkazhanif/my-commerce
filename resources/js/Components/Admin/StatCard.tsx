import { Package } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon?: string;
    isLive?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    icon,
    isLive = false,
}) => {
    const getIconColor = () => {
        if (isLive) return 'bg-emerald-50 text-emerald-600';
        if (icon === 'emerald') return 'bg-emerald-50 text-emerald-600';
        if (icon === 'blue') return 'bg-blue-50 text-blue-600';
        return 'bg-slate-50 text-slate-600';
    };

    return (
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className={`rounded-xl p-4 ${getIconColor()}`}>
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
};
