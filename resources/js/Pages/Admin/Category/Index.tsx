import Content from '@/Components/Dashboard/Content';
import ButtonIcon from '@/Components/UI/Button/ButtonIcon';
import NoRows from '@/Components/UI/Table/NoRows';
import RowBody from '@/Components/UI/Table/RowBody';
import Table from '@/Components/UI/Table/Table';
import TableBody from '@/Components/UI/Table/TableBody';
import TableFooter from '@/Components/UI/Table/TableFooter';
import TableHeader from '@/Components/UI/Table/TableHeader';
import TableRow from '@/Components/UI/Table/TableRow';
import TableToolbar from '@/Components/UI/Table/TableToolbar';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    children_count?: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedCategories {
    data: Category[];
    links: PaginationLink[];
    meta: {
        from: number;
        to: number;
        total: number;
        links: PaginationLink[];
    };
}

const Index: React.FC<{ categories: PaginatedCategories }> = ({
    categories,
}) => {
    const headers = [
        {
            title: 'Name',
        },
        {
            title: 'Children',
        },
        {
            title: 'Action',
        },
    ];

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AdminLayout title="Categories">
            {/* Content Area */}
            <Content>
                <TableToolbar
                    showFilter={false}
                    createLabel="Add New Category"
                    createLink={route('admin.categories.create')}
                />
                <Table>
                    <TableHeader headers={headers} />
                    <TableBody>
                        {categories?.data?.map((category) => (
                            <TableRow key={category.id}>
                                <RowBody>{category.name}</RowBody>
                                <RowBody>
                                    {category.children_count !== undefined
                                        ? category.children_count
                                        : '-'}
                                </RowBody>
                                <RowBody isFlex>
                                    <Link
                                        href={route(
                                            'admin.categories.edit',
                                            category.id,
                                        )}
                                    >
                                        <ButtonIcon icon={<Edit size={18} />} />
                                    </Link>
                                    <ButtonIcon
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                        icon={<Trash2 size={18} />}
                                    />
                                </RowBody>
                            </TableRow>
                        ))}
                        {(!categories?.data ||
                            categories.data.length === 0) && (
                            <NoRows
                                title="No available categories"
                                colSpan={3}
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
