import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Image as ImageIcon, Save, Type } from 'lucide-react';
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';

// 1. Define Types
interface Category {
    id: number;
    name: string;
}

interface CreateCategoryProps {
    parents: Category[];
}

interface CategoryForm {
    name: string;
    slug: string;
    parent_id: string; // string because select value usually comes as string
    description: string;
    image: File | null;
    is_active: boolean;
}

export default function Create({ parents }: CreateCategoryProps) {
    // 2. Setup Form with Type
    const { data, setData, post, processing, errors } = useForm<CategoryForm>({
        name: '',
        slug: '',
        parent_id: '',
        description: '',
        image: null,
        is_active: true,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // 3. Auto-generate Slug from Name
    useEffect(() => {
        const slug = data.name
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');

        setData((prev) => ({ ...prev, slug: slug }));
    }, [data.name, setData]);

    // 4. Handle Image Preview
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.categories.store'));
    };

    return (
        <AdminLayout title="Create Category">
            <Head title="Create Category" />

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
                                    Create Category
                                </h1>
                                <p className="text-sm text-slate-500">
                                    Add a new product category
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
                                {processing ? 'Saving...' : 'Save Category'}
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
                                            Slug{' '}
                                            <span className="font-normal text-slate-400">
                                                (Auto-generated)
                                            </span>
                                        </label>
                                        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
                                            <span className="text-sm text-slate-400">
                                                /categories/
                                            </span>
                                            <input
                                                type="text"
                                                value={data.slug}
                                                disabled
                                                onChange={(e) =>
                                                    setData(
                                                        'slug',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full border-0 bg-transparent p-0 text-sm font-medium text-slate-600 focus:outline-none"
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
        </AdminLayout>
    );
}
