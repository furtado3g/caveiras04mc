import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ members, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('members.index'), { search, status }, { preserveState: true });
    };

    const statusColors = {
        prospect: 'bg-blue-900 text-blue-300',
        member: 'bg-green-900 text-green-300',
        veteran: 'bg-yellow-900 text-yellow-300',
        inactive: 'bg-gray-800 text-gray-400',
        removed: 'bg-red-900 text-red-300',
    };

    const statusLabels = {
        prospect: 'Prospect',
        member: 'Membro',
        veteran: 'Veterano',
        inactive: 'Inativo',
        removed: 'Desligado',
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Membros</h2>
                    <Link
                        href={route('members.create')}
                        className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700"
                    >
                        Novo Membro
                    </Link>
                </div>
            }
        >
            <Head title="Membros" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form onSubmit={handleSearch} className="mb-6 flex gap-4">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar por nome, CPF ou telefone..."
                            className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none"
                        />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-yellow-500 focus:outline-none"
                        >
                            <option value="">Todos os status</option>
                            <option value="prospect">Prospect</option>
                            <option value="member">Membro</option>
                            <option value="veteran">Veterano</option>
                            <option value="inactive">Inativo</option>
                            <option value="removed">Desligado</option>
                        </select>
                        <button
                            type="submit"
                            className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
                        >
                            Buscar
                        </button>
                    </form>

                    <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900">
                        <table className="min-w-full divide-y divide-gray-800">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Nome
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                        CPF
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Telefone
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Motos
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {members.data.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-800">
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    {member.photo_path ? (
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover"
                                                            src={`/storage/${member.photo_path}`}
                                                            alt={member.full_name}
                                                        />
                                                    ) : (
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-300">
                                                            {member.full_name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-white">
                                                        {member.full_name}
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        {member.age} anos
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                                            {member.masked_cpf}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                                            {member.mobile_phone}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors[member.status]}`}>
                                                {statusLabels[member.status]}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                                            {member.vehicles?.length || 0}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            <Link
                                                href={route('members.show', member.id)}
                                                className="text-yellow-400 hover:text-yellow-300"
                                            >
                                                Ver
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {members.last_page > 1 && (
                        <div className="mt-4 flex justify-center">
                            {members.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`mx-1 rounded px-3 py-1 text-sm ${
                                        link.active
                                            ? 'bg-yellow-600 text-white'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
