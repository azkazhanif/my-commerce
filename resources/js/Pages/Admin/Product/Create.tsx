import AdminLayout from '@/Layouts/AdminLayout'; // Adjust path as needed
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Box,
    Image as ImageIcon,
    Layers,
    Plus,
    Save,
    Trash2,
} from 'lucide-react';
import { useEffect } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface CreateProps {
    categories: Category[];
}

export default function Create({ categories }: CreateProps) {
    // 1. Core Form Data
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        category_id: '',
        price: '', // Base price
        is_active: true,
        // The structure for our dynamic options
        options: [
            // Example structure: { id: 1, name: 'Color', values: ['Red', 'Blue'] }
        ],
        // The generated SKUs (Variants)
        variants: [],
    });

    // 2. Add a new Option Type (e.g., "Size")
    const addOption = () => {
        setData('options', [
            ...data.options,
            { id: Date.now(), name: '', values: [] },
        ]);
    };

    // 3. Remove an Option Type
    const removeOption = (id: number) => {
        setData(
            'options',
            data.options.filter((opt) => opt.id !== id),
        );
    };

    // 4. Update Option Name (e.g., changing "Colr" to "Color")
    const updateOptionName = (id: number, newName: string) => {
        const newOptions = data.options.map((opt) =>
            opt.id === id ? { ...opt, name: newName } : opt,
        );
        setData('options', newOptions);
    };

    // 5. Add a Value to an Option (e.g., adding "Red" to "Color")
    const addOptionValue = (optionId: number, value: string) => {
        if (!value) return;
        const newOptions = data.options.map((opt) => {
            if (opt.id === optionId && !opt.values.includes(value)) {
                return { ...opt, values: [...opt.values, value] };
            }
            return opt;
        });
        setData('options', newOptions);
    };

    // 6. Remove a Value
    const removeOptionValue = (optionId: number, valueToRemove: string) => {
        const newOptions = data.options.map((opt) => {
            if (opt.id === optionId) {
                return {
                    ...opt,
                    values: opt.values.filter((v) => v !== valueToRemove),
                };
            }
            return opt;
        });
        setData('options', newOptions);
    };

    // 7. THE ALGORITHM: Cartesian Product to generate Variants
    useEffect(() => {
        // Filter out options that don't have values yet
        const validOptions = data.options.filter(
            (opt) => opt.values.length > 0,
        );

        if (validOptions.length === 0) {
            setData('variants', []);
            return;
        }

        // Helper to generate combinations
        const cartesian = (args) => {
            const result = [];
            const max = args.length - 1;
            function helper(arr, i) {
                for (let j = 0, l = args[i].values.length; j < l; j++) {
                    const a = arr.slice(0); // clone arr
                    a.push(args[i].values[j]);
                    if (i === max) result.push(a);
                    else helper(a, i + 1);
                }
            }
            helper([], 0);
            return result;
        };

        const combinations = cartesian(validOptions);

        // Transform combinations into Variant Objects
        const newVariants = combinations.map((combo, index) => {
            // Create a name like "Red - XL"
            const name = combo.join(' - ');
            return {
                id: index, // temporary ID for UI key
                name: name,
                options: combo, // ['Red', 'XL']
                sku: '', // User will fill this or auto-generate
                price: data.price || 0,
                stock: 0,
            };
        });

        setData('variants', newVariants);
    }, [data.options]); // Re-run whenever options change

    const handleSubmit = (e) => {
        e.preventDefault();
        // post(route('admin.products.store'));
    };

    return (
        <AdminLayout title="Create Product">
            <Head title="Create Product" />

            <form onSubmit={handleSubmit} className="flex h-full flex-col">
                {/* Header Actions */}
                <div className="border-b border-slate-200 bg-white px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('admin.products')} // Check route name
                                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                            >
                                <ArrowLeft size={20} />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800">
                                    Add New Product
                                </h1>
                                <p className="text-sm text-slate-500">
                                    Fill in the details to create a product
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                            >
                                Save as Draft
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-100 disabled:opacity-75"
                            >
                                <Save size={18} />
                                {processing ? 'Saving...' : 'Publish Product'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
                    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
                        {/* LEFT COLUMN: Main Info */}
                        <div className="space-y-8 lg:col-span-2">
                            {/* 1. Basic Details Card */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
                                    <Layers
                                        size={20}
                                        className="text-emerald-500"
                                    />
                                    General Information
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                            placeholder="e.g. Nike Air Jordan"
                                        />
                                        {errors.name && (
                                            <div className="mt-1 text-xs text-red-500">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            Description
                                        </label>
                                        <textarea
                                            rows="4"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                            placeholder="Describe your product..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 2. Variants & Options Card */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
                                        <Box
                                            size={20}
                                            className="text-emerald-500"
                                        />
                                        Product Variants
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={addOption}
                                        className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                                    >
                                        <Plus size={16} /> Add Variant Option
                                    </button>
                                </div>

                                {/* Dynamic Option Builders */}
                                <div className="space-y-6">
                                    {data.options.map((option, index) => (
                                        <div
                                            key={option.id}
                                            className="relative rounded-xl border border-slate-100 bg-slate-50/50 p-4"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeOption(option.id)
                                                }
                                                className="absolute right-4 top-4 text-slate-400 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div>
                                                    <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                                                        Option Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={option.name}
                                                        onChange={(e) =>
                                                            updateOptionName(
                                                                option.id,
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="e.g. Color, Size"
                                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">
                                                        Values (Press Enter)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Type & press Enter..."
                                                        onKeyDown={(e) => {
                                                            if (
                                                                e.key ===
                                                                'Enter'
                                                            ) {
                                                                e.preventDefault();
                                                                addOptionValue(
                                                                    option.id,
                                                                    e.target
                                                                        .value,
                                                                );
                                                                e.target.value =
                                                                    '';
                                                            }
                                                        }}
                                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
                                                    />
                                                </div>
                                            </div>

                                            {/* Value Tags */}
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {option.values.map(
                                                    (val, vIdx) => (
                                                        <span
                                                            key={vIdx}
                                                            className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700"
                                                        >
                                                            {val}
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeOptionValue(
                                                                        option.id,
                                                                        val,
                                                                    )
                                                                }
                                                                className="text-emerald-500 hover:text-emerald-800"
                                                            >
                                                                &times;
                                                            </button>
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Generated Variants Table */}
                                {data.variants.length > 0 && (
                                    <div className="mt-8">
                                        <h4 className="mb-3 text-sm font-semibold text-slate-700">
                                            Variant Configuration
                                        </h4>
                                        <div className="overflow-hidden rounded-xl border border-slate-200">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                                                    <tr>
                                                        <th className="px-4 py-3">
                                                            Variant
                                                        </th>
                                                        <th className="px-4 py-3">
                                                            Price
                                                        </th>
                                                        <th className="px-4 py-3">
                                                            Stock
                                                        </th>
                                                        <th className="px-4 py-3">
                                                            SKU Code
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 bg-white">
                                                    {data.variants.map(
                                                        (variant, idx) => (
                                                            <tr key={idx}>
                                                                <td className="px-4 py-3 font-medium text-slate-700">
                                                                    {
                                                                        variant.name
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <div className="flex items-center rounded-lg border border-slate-200 px-2">
                                                                        <span className="text-slate-400">
                                                                            Rp
                                                                        </span>
                                                                        <input
                                                                            type="number"
                                                                            className="w-24 border-none bg-transparent py-1 text-sm focus:ring-0"
                                                                            placeholder="0"
                                                                            onChange={(
                                                                                e,
                                                                            ) => {
                                                                                const updated =
                                                                                    [
                                                                                        ...data.variants,
                                                                                    ];
                                                                                updated[
                                                                                    idx
                                                                                ].price =
                                                                                    e.target.value;
                                                                                setData(
                                                                                    'variants',
                                                                                    updated,
                                                                                );
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <input
                                                                        type="number"
                                                                        className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-sm outline-none focus:border-emerald-500"
                                                                        placeholder="0"
                                                                        onChange={(
                                                                            e,
                                                                        ) => {
                                                                            const updated =
                                                                                [
                                                                                    ...data.variants,
                                                                                ];
                                                                            updated[
                                                                                idx
                                                                            ].stock =
                                                                                e.target.value;
                                                                            setData(
                                                                                'variants',
                                                                                updated,
                                                                            );
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <input
                                                                        type="text"
                                                                        className="w-32 rounded-lg border border-slate-200 px-2 py-1 text-sm outline-none focus:border-emerald-500"
                                                                        placeholder="Auto"
                                                                        onChange={(
                                                                            e,
                                                                        ) => {
                                                                            const updated =
                                                                                [
                                                                                    ...data.variants,
                                                                                ];
                                                                            updated[
                                                                                idx
                                                                            ].sku =
                                                                                e.target.value;
                                                                            setData(
                                                                                'variants',
                                                                                updated,
                                                                            );
                                                                        }}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Organization */}
                        <div className="space-y-8">
                            {/* Category & Status */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                                    Organization
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            Category
                                        </label>
                                        <select
                                            value={data.category_id}
                                            onChange={(e) =>
                                                setData(
                                                    'category_id',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                        >
                                            <option value="">
                                                Select Category
                                            </option>
                                            {/* Assuming categories are passed as props */}
                                            {categories &&
                                                categories.map((cat) => (
                                                    <option
                                                        key={cat.id}
                                                        value={cat.id}
                                                    >
                                                        {cat.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-slate-700">
                                            Status
                                        </label>
                                        <select
                                            value={data.is_active}
                                            onChange={(e) =>
                                                setData(
                                                    'is_active',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                        >
                                            <option value={true}>
                                                Active (Published)
                                            </option>
                                            <option value={false}>
                                                Draft (Hidden)
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Image Upload (Simple Placeholder) */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                                    Media
                                </h3>
                                <div className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-12 transition-colors hover:bg-slate-100">
                                    <div className="rounded-full bg-slate-200 p-3 text-slate-500">
                                        <ImageIcon size={24} />
                                    </div>
                                    <p className="mt-2 text-sm font-medium text-slate-600">
                                        Click to upload image
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        SVG, PNG, JPG (Max 2MB)
                                    </p>
                                    <input type="file" className="hidden" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
