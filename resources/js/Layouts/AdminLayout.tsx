import Header from '@/Components/Dashboard/Header';
import { Sidebar } from '@/Components/Dashboard/Sidebar';
import { Head } from '@inertiajs/react';

interface AdminLayoutProps {
    title: string;
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ title, children }) => {
    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
            <Head title={title} />
            <Sidebar />

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <Header title={title} />

                <div>{children}</div>
            </main>
        </div>
    );
};

export default AdminLayout;
