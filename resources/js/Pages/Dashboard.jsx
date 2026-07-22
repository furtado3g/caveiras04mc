import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, expiringDocs, overduePayments, birthdayMembers, recentMembers }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-white">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard title="Membros Ativos" value={stats.totalMembers} href={route('members.index')} />
                        <StatCard title="Motos Cadastradas" value={stats.totalVehicles} />
                        <StatCard title="Docs Vencendo" value={stats.expiringDocsCount} color="yellow" />
                        <StatCard title="Mensalidades Atrasadas" value={stats.overduePaymentsCount} color="red" />
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {birthdayMembers.length > 0 && (
                            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                                <h3 className="mb-4 text-lg font-semibold text-yellow-400">
                                    Aniversariantes do Dia
                                </h3>
                                <div className="space-y-3">
                                    {birthdayMembers.map((member) => (
                                        <div key={member.id} className="flex items-center justify-between">
                                            <span className="text-gray-300">{member.full_name}</span>
                                            <span className="text-sm text-gray-500">{member.age} anos</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {expiringDocs.length > 0 && (
                            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                                <h3 className="mb-4 text-lg font-semibold text-yellow-400">
                                    Documentos Vencendo (30 dias)
                                </h3>
                                <div className="space-y-3">
                                    {expiringDocs.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between">
                                            <div>
                                                <span className="text-gray-300">{doc.member?.full_name}</span>
                                                <span className="ml-2 text-sm text-gray-500">- {doc.type}</span>
                                            </div>
                                            <span className="text-sm text-yellow-500">
                                                {new Date(doc.expiry_date).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                            <h3 className="mb-4 text-lg font-semibold text-white">Membros Recentes</h3>
                            <div className="space-y-3">
                                {recentMembers.map((member) => (
                                    <Link
                                        key={member.id}
                                        href={route('members.show', member.id)}
                                        className="flex items-center justify-between rounded p-2 hover:bg-gray-800"
                                    >
                                        <span className="text-gray-300">{member.full_name}</span>
                                        <span className="text-sm text-gray-500">{member.status}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {overduePayments.length > 0 && (
                            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                                <h3 className="mb-4 text-lg font-semibold text-red-400">
                                    Mensalidades Atrasadas
                                </h3>
                                <div className="space-y-3">
                                    {overduePayments.map((payment) => (
                                        <div key={payment.id} className="flex items-center justify-between">
                                            <span className="text-gray-300">{payment.member?.full_name}</span>
                                            <span className="text-sm text-red-500">
                                                R$ {parseFloat(payment.amount).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, value, href, color = 'default' }) {
    const colorClasses = {
        default: 'text-white',
        yellow: 'text-yellow-400',
        red: 'text-red-400',
    };

    const content = (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            <p className={`mt-2 text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
        </div>
    );

    return href ? <Link href={href}>{content}</Link> : content;
}
