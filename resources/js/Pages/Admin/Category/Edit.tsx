import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Edit as EditIcon,
    GitFork,
    Image as ImageIcon,
    Plus,
    Save,
    Trash2,
    Type,
    X,
} from 'lucide-react';
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';

// 1. Define Types
interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    is_active: boolean;
    parent_id: number | null;
    children?: Category[];
}

interface EditCategoryProps {
    category: Category;
    children: Category[];
}

interface CategoryForm {
    name: string;
    slug: string;
    parent_id: string;
    description: string;
    image: File | null;
    is_active: boolean;
    stay_on_page?: boolean;
    _method?: string;
}

export default function Edit({ category, children }: EditCategoryProps) {
    // --- MAIN FORM ---
    const { data, setData, post, processing, errors } = useForm<CategoryForm>({
        name: category.name || '',
        slug: category.slug || '',
        parent_id: category.parent_id ? String(category.parent_id) : '',
        description: category.description || '',
        image: null,
        is_active: category.is_active,
        _method: 'put',
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(
        category.image_url,
    );

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.categories.update', category.id));
    };

    // --- CHILD MODAL & FORM ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingChild, setEditingChild] = useState<Category | null>(null);
    const [childPreviewUrl, setChildPreviewUrl] = useState<string | null>(null);

    const childForm = useForm<CategoryForm>({
        name: '',
        slug: '',
        parent_id: String(category.id), // Always the current category
        description: '',
        image: null,
        is_active: true,
        stay_on_page: true,
    });

    const openCreateModal = () => {
        setEditingChild(null);
        setChildPreviewUrl(null);
        childForm.reset();
        childForm.setData({
            name: '',
            slug: '',
            parent_id: String(category.id),
            description: '',
            image: null,
            is_active: true,
            stay_on_page: true,
        });
        childForm.clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (child: Category) => {
        setEditingChild(child);
        setChildPreviewUrl(child.image_url);
        childForm.clearErrors();
        childForm.setData({
            name: child.name,
            slug: child.slug,
            parent_id: String(category.id),
            description: child.description || '',
            image: null,
            is_active: child.is_active,
            stay_on_page: true,
            _method: 'put',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        childForm.reset();
    };

    // Auto-slug for Child Form (only when creating)
    useEffect(() => {
        if (!editingChild && childForm.data.name) {
            const slug = childForm.data.name
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
            childForm.setData((prev) => ({ ...prev, slug: slug }));
        }
    }, [childForm.data.name, editingChild, childForm]);

    const handleChildImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            childForm.setData('image', file);
            setChildPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleChildSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingChild) {
            // Update
            childForm.post(route('admin.categories.update', editingChild.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            // Create
            childForm.post(route('admin.categories.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteChild = (childId: number) => {
        if (confirm('Are you sure you want to delete this sub-category?')) {
            router.delete(route('admin.categories.destroy', childId), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout title={`Edit ${category.name}`}>
            <Head title={`Edit ${category.name}`} />

            <form onSubmit={handleSubmit} className="flex h-full flex-col">
                {/* --- Header Actions --- */}
                <div className="border-b border-slate-200 bg-white px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('admin.categories')}
                                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800">
                                    Edit Category
                                </h1>
                                <p className="text-sm text-slate-500">
                                    {category.name}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href={route('admin.categories')}
                                className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-100 disabled:opacity-75"
                            >
                                <Save size={18} />
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Main Content --- */}
                <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
                    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
                        {/* LEFT COLUMN: Main Info */}
                        <div className="space-y-8 lg:col-span-2">
                            {/* Basic Details Card */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-800">
                                    <Type
                                        size={20}
                                        className="text-emerald-500"
                                    />
                                    General Information
                                </h3>

                                <div className="space-y-5">
                                    {/* Name Input */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            Category Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                            placeholder="e.g. Men's Fashion"
                                        />
                                        {errors.name && (
                                            <div className="mt-1 text-xs text-red-500">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Slug Input */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            Slug
                                        </label>
                                        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
                                            <span className="mr-1 text-sm text-slate-400">
                                                /categories/
                                            </span>
                                            <input
                                                type="text"
                                                value={data.slug}
                                                onChange={(e) =>
                                                    setData(
                                                        'slug',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full bg-transparent text-sm font-medium text-slate-600 focus:outline-none"
                                                placeholder="mens-fashion"
                                            />
                                        </div>
                                        {errors.slug && (
                                            <div className="mt-1 text-xs text-red-500">
                                                {errors.slug}
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            Description
                                        </label>
                                        <textarea
                                            rows={4}
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                            placeholder="Add a short description for SEO..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* --- Children Categories Section --- */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                                        <GitFork
                                            size={20}
                                            className="text-emerald-500"
                                        />
                                        Sub-Categories
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={openCreateModal}
                                        className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-100"
                                    >
                                        <Plus size={16} />
                                        Add Sub-Category
                                    </button>
                                </div>

                                {children && children.length > 0 ? (
                                    <div className="overflow-hidden rounded-xl border border-slate-200">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-slate-50 text-slate-500">
                                                <tr>
                                                    <th className="px-4 py-3 font-medium">
                                                        Name
                                                    </th>
                                                    <th className="px-4 py-3 font-medium">
                                                        Slug
                                                    </th>
                                                    <th className="px-4 py-3 text-right font-medium">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200">
                                                {children.map((child) => (
                                                    <tr
                                                        key={child.id}
                                                        className="hover:bg-slate-50"
                                                    >
                                                        <td className="px-4 py-3 font-medium text-slate-800">
                                                            {child.name}
                                                        </td>
                                                        <td className="px-4 py-3 text-slate-500">
                                                            {child.slug}
                                                        </td>
                                                        <td className="px-4 py-3 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        openEditModal(
                                                                            child,
                                                                        )
                                                                    }
                                                                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-white hover:text-emerald-600 hover:shadow-sm"
                                                                >
                                                                    <EditIcon
                                                                        size={
                                                                            14
                                                                        }
                                                                    />{' '}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        deleteChild(
                                                                            child.id,
                                                                        )
                                                                    }
                                                                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-white hover:text-red-600 hover:shadow-sm"
                                                                >
                                                                    <Trash2
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-8 text-center">
                                        <p className="text-sm font-medium text-slate-600">
                                            No sub-categories yet
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Add a child category to organize
                                            products
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Hierarchy & Media */}
                        <div className="space-y-8">
                            {/* Image Upload */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                                    Cover Image
                                </h3>

                                <div className="relative">
                                    {previewUrl ? (
                                        <div className="group relative h-48 w-full overflow-hidden rounded-xl border border-slate-200">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                            {/* Hover Overlay to change */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                <label className="cursor-pointer rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30">
                                                    Change Image
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        accept="image/*"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-10 transition-colors hover:border-emerald-300 hover:bg-slate-100">
                                            <div className="mb-2 rounded-full bg-white p-3 text-emerald-500 shadow-sm">
                                                <ImageIcon size={24} />
                                            </div>
                                            <p className="text-sm font-medium text-slate-600">
                                                Upload Image
                                            </p>
                                            <p className="mt-1 text-xs text-slate-400">
                                                PNG, JPG up to 2MB
                                            </p>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                            />
                                        </label>
                                    )}
                                    {errors.image && (
                                        <div className="mt-2 text-xs text-red-500">
                                            {errors.image}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* --- CHILD MODAL --- */}
            <Modal show={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleChildSubmit} className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800">
                            {editingChild
                                ? 'Edit Sub-Category'
                                : 'Add Sub-Category'}
                        </h2>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Child Name */}
                        <div>
                            <InputLabel htmlFor="child_name" value="Name" />
                            <TextInput
                                id="child_name"
                                type="text"
                                className="mt-1 block w-full"
                                value={childForm.data.name}
                                onChange={(e) =>
                                    childForm.setData('name', e.target.value)
                                }
                                placeholder="e.g. Sneakers"
                            />
                            <InputError
                                message={childForm.errors.name}
                                className="mt-2"
                            />
                        </div>

                        {/* Child Slug */}
                        <div>
                            <InputLabel htmlFor="child_slug" value="Slug" />
                            <TextInput
                                id="child_slug"
                                type="text"
                                className="mt-1 block w-full"
                                value={childForm.data.slug}
                                onChange={(e) =>
                                    childForm.setData('slug', e.target.value)
                                }
                                placeholder="sneakers"
                            />
                            <InputError
                                message={childForm.errors.slug}
                                className="mt-2"
                            />
                        </div>

                        {/* Child Description */}
                        <div>
                            <InputLabel
                                htmlFor="child_desc"
                                value="Description"
                            />
                            <textarea
                                id="child_desc"
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                value={childForm.data.description}
                                onChange={(e) =>
                                    childForm.setData(
                                        'description',
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        {/* Child Image */}
                        <div>
                            <InputLabel value="Image" />
                            <div className="mt-2 flex items-center gap-4">
                                {childPreviewUrl && (
                                    <div className="h-16 w-16 overflow-hidden rounded-lg border border-slate-200">
                                        <img
                                            src={childPreviewUrl}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                                <label className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                                    Choose File
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleChildImageChange}
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                            <InputError
                                message={childForm.errors.image}
                                className="mt-2"
                            />
                        </div>

                        {/* Child Status */}
                        <div className="block">
                            <label className="flex items-center">
                                <Checkbox
                                    checked={childForm.data.is_active}
                                    onChange={(e) =>
                                        childForm.setData(
                                            'is_active',
                                            e.target.checked,
                                        )
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Active
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton disabled={childForm.processing}>
                            {childForm.processing ? 'Saving...' : 'Save'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
