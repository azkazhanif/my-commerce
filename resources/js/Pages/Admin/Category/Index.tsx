import Content from '@/Components/Admin/Content';
import ButtonIcon from '@/Components/Button/ButtonIcon';
import NoRows from '@/Components/Table/NoRows';
import RowBody from '@/Components/Table/RowBody';
import Table from '@/Components/Table/Table';
import TableBody from '@/Components/Table/TableBody';
import TableFooter from '@/Components/Table/TableFooter';
import TableHeader from '@/Components/Table/TableHeader';
import TableRow from '@/Components/Table/TableRow';
import TableToolbar from '@/Components/Table/TableToolbar';
import AdminLayout from '@/Layouts/AdminLayout';
import { Edit, Trash2 } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface PaginatedCategories {
    data: Category[];
    links: any[];
    meta: any[];
    from: number;
    to: number;
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
}

const Index: React.FC<{ categories: PaginatedCategories }> = ({
    categories,
}) => {
    const headers = [
        {
            title: 'Name',
        },
        {
            title: 'Action',
        },
    ];

    return (
        <AdminLayout title="Categories">
            {/* Content Area */}
            <Content>
                <TableToolbar />
                <Table>
                    <TableHeader headers={headers} />
                    <TableBody>
                        {categories?.data?.map((category) => (
                            <TableRow key={category.id}>
                                <RowBody>{category.name}</RowBody>
                                <RowBody isFlex>
                                    <ButtonIcon icon={<Edit size={18} />} />
                                    <ButtonIcon icon={<Trash2 size={18} />} />
                                </RowBody>
                            </TableRow>
                        ))}
                        {(!categories?.data ||
                            categories.data.length === 0) && (
                            <NoRows
                                title="No available categories"
                                colSpan={2}
                            />
                        )}
                    </TableBody>
                </Table>
                {categories?.links && <TableFooter meta={categories.meta} />}
            </Content>
        </AdminLayout>
    );
};

export default Index;
