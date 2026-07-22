import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ birthdayImages }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-white">Imagens de Aniversário</h2>}
        >
            <Head title="Aniversários" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <GenerateForm />

                    <div className="mt-8 overflow-hidden rounded-lg border border-gray-800 bg-gray-900">
                        <table className="min-w-full divide-y divide-gray-800">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Membro
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Template
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Data
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {birthdayImages.data.map((image) => (
                                    <tr key={image.id} className="hover:bg-gray-800">
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                                            {image.member?.full_name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                                            {image.template?.name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <StatusBadge status={image.status} />
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                                            {new Date(image.created_at).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            {image.status === 'done' && (
                                                <a
                                                    href={route('birthday.download', image.id)}
                                                    className="text-yellow-400 hover:text-yellow-300"
                                                >
                                                    Download
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {birthdayImages.last_page > 1 && (
                        <div className="mt-4 flex justify-center">
                            {birthdayImages.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`mx-1 rounded px-3 py-1 text-sm ${
                                        link.active ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function GenerateForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        member_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('birthday.generate'), { onSuccess: () => reset() });
    };

    return (
        <form onSubmit={submit} className="flex items-end gap-4 rounded-lg border border-gray-800 bg-gray-900 p-4">
            <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-300">Gerar para membro</label>
                <input
                    type="number"
                    value={data.member_id}
                    onChange={(e) => setData('member_id', e.target.value)}
                    placeholder="ID do membro"
                    className="input"
                />
                {errors.member_id && <p className="mt-1 text-sm text-red-400">{errors.member_id}</p>}
            </div>
            <button
                type="submit"
                disabled={processing}
                className="rounded-lg bg-yellow-600 px-6 py-2 text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50"
            >
                {processing ? 'Gerando...' : 'Gerar Imagem'}
            </button>
        </form>
    );
}

function StatusBadge({ status }) {
    const colors = {
        pending: 'bg-yellow-900 text-yellow-300',
        processing: 'bg-blue-900 text-blue-300',
        done: 'bg-green-900 text-green-300',
        failed: 'bg-red-900 text-red-300',
    };

    const labels = {
        pending: 'Pendente',
        processing: 'Processando',
        done: 'Concluído',
        failed: 'Falhou',
    };

    return (
        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${colors[status]}`}>
            {labels[status]}
        </span>
    );
}
