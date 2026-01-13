import { Bell, Search, Settings } from 'lucide-react';

const Header = () => {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/80 px-8 py-4 backdrop-blur-md">
            <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
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
    );
};

export default Header;
