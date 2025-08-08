import { useState, useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Folder, PageProps } from '@/types';

interface Props extends PageProps {
    folder: Folder;
}

export default function FolderShow({ folder, flash }: Props) {
    const [showResults, setShowResults] = useState(false);
    const { data, setData, post, processing } = useForm({
        domains: '',
    });

    useEffect(() => {
        if (flash?.addedDomains || flash?.duplicates) {
            setShowResults(true);
        }
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/folders/${folder.id}/domains`, {
            onFinish: () => setData('domains', ''),
        });
    };

    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <Link
                    href="/folders"
                    className="text-blue-500 hover:underline"
                >
                    ← Powrót do folderów
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-6">{folder.name}</h1>

            {/* Formularz dodawania domen */}
            <form onSubmit={handleSubmit} className="mb-8">
                <label className="block text-sm font-medium mb-2">
                    Dodaj domeny (rozdzielone przecinkami)
                </label>
                <textarea
                    value={data.domains}
                    onChange={(e) => setData('domains', e.target.value)}
                    placeholder="example.com, https://another-site.org/path, sub.domain.pl"
                    className="w-full px-4 py-2 border rounded h-32"
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="mt-2 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Dodaj Domeny
                </button>
            </form>

            {/* Rezultaty dodawania - nowe domeny i duplikaty */}
            {showResults && (flash?.addedDomains || flash?.duplicates) && (
                <div className="mb-6 space-y-4">
                    {/* Nowo dodane domeny */}
                    {flash.addedDomains && flash.addedDomains.length > 0 && (
                        <div className="p-4 bg-green-100 border border-green-300 rounded">
                            <h3 className="font-semibold mb-2 text-green-800">
                                ✓ Nowo dodane domeny ({flash.addedDomains.length}):
                            </h3>
                            <ul className="space-y-1">
                                {flash.addedDomains.map((domain, index) => (
                                    <li key={index} className="text-green-700">
                                        {domain}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Duplikaty */}
                    {flash.duplicates && flash.duplicates.length > 0 && (
                        <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
                            <h3 className="font-semibold mb-2 text-yellow-800">
                                ⚠ Znalezione duplikaty ({flash.duplicates.length}):
                            </h3>
                            <ul className="space-y-2">
                                {flash.duplicates.map((duplicate, index) => (
                                    <li key={index} className="text-yellow-700">
                                        <div className="font-mono text-sm">
                                            <span className="font-semibold">Próbowano dodać:</span> {duplicate.attempted}
                                        </div>
                                        <div className="font-mono text-sm ml-4">
                                            <span className="font-semibold">Już istnieje jako:</span> {duplicate.existing}
                                        </div>
                                        <div className="font-mono text-xs ml-4 text-yellow-600">
                                            (znormalizowana: {duplicate.normalized})
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Przycisk zamknięcia rezultatów */}
                    <button
                        onClick={() => setShowResults(false)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        Zamknij rezultaty
                    </button>
                </div>
            )}

            {/* Lista istniejących domen */}
            <div className="bg-white border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Wszystkie domeny ({folder.domains?.length || 0})
                </h2>
                {folder.domains && folder.domains.length > 0 ? (
                    <div className="space-y-2">
                        {folder.domains.map((domain) => (
                            <div
                                key={domain.id}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded"
                            >
                                <span className="font-mono text-sm">
                                    {domain.original_url}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {domain.normalized_domain}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">
                        Brak domen w tym folderze
                    </p>
                )}
            </div>
        </div>
    );
}
