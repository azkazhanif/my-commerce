import Header from '@/Components/Admin/Header';
import { Sidebar } from '@/Components/Admin/Sidebar';
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
                <Header />

                <div className="space-y-8 p-8">{children}</div>
            </main>
        </div>
    );
};

export default AdminLayout;
