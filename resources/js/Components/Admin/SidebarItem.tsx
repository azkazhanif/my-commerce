interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    icon,
    label,
    active = false,
}) => (
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
