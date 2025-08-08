import { useForm, Link } from '@inertiajs/react';
import { Folder, PageProps } from '@/types';

interface Props extends PageProps {
    folders: Folder[];
}

export default function FoldersIndex({ folders }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/folders', {
            onSuccess: () => setData('name', ''),
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">My Folders</h1>

            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Name of the folder"
                        className="flex-1 px-4 py-2 border rounded"
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Create Folder
                    </button>
                </div>
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {folders.map((folder) => (
                    <Link
                        key={folder.id}
                        href={`/folders/${folder.id}`}
                        className="block p-6 bg-white border rounded-lg hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-semibold">{folder.name}</h3>
                        <p className="text-gray-600 mt-2">
                            Domains: {folder.domains_count || 0}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
