import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Show({ member }) {
    const [activeTab, setActiveTab] = useState('info');

    const tabs = [
        { id: 'info', label: 'Dados Pessoais' },
        { id: 'vehicles', label: 'Motos' },
        { id: 'documents', label: 'Documentos' },
        { id: 'health', label: 'Saúde' },
        { id: 'fiscal', label: 'Financeiro' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">{member.full_name}</h2>
                    <Link
                        href={route('members.edit', member.id)}
                        className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                    >
                        Editar
                    </Link>
                </div>
            }
        >
            <Head title={member.full_name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-800 pb-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`rounded-t-lg px-4 py-2 text-sm font-medium ${
                                    activeTab === tab.id
                                        ? 'bg-gray-800 text-yellow-400'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'info' && (
                        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <InfoItem label="Nome Completo" value={member.full_name} />
                                <InfoItem label="Data de Nascimento" value={new Date(member.birth_date).toLocaleDateString('pt-BR')} />
                                <InfoItem label="Idade" value={`${member.age} anos`} />
                                <InfoItem label="Endereço" value={member.full_address} />
                                <InfoItem label="Cônjuge" value={member.spouse_name || '-'} />
                                <InfoItem label="Endereço de Trabalho" value={member.work_address || '-'} />
                                <InfoItem label="Celular" value={member.mobile_phone} />
                                <InfoItem label="Contato de Emergência" value={member.emergency_contact_name} />
                                <InfoItem label="Telefone Emergência" value={member.emergency_contact_phone} />
                                <InfoItem label="CPF" value={member.masked_cpf} />
                                <InfoItem label="RG" value={member.rg || '-'} />
                                <InfoItem label="Status" value={member.status} />
                                <InfoItem label="Membro há" value={`${member.club_years} anos`} />
                                <InfoItem label="Membro desde" value={new Date(member.club_join_date).toLocaleDateString('pt-BR')} />
                                <InfoItem label="Membro anterior" value={member.previous_mc_member ? `Sim - ${member.previous_mc_name || 'Não informado'}` : 'Não'} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'vehicles' && <VehiclesTab member={member} />}
                    {activeTab === 'documents' && <DocumentsTab member={member} />}
                    {activeTab === 'health' && <HealthTab member={member} />}
                    {activeTab === 'fiscal' && <FiscalTab member={member} />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function InfoItem({ label, value }) {
    return (
        <div>
            <dt className="text-sm text-gray-400">{label}</dt>
            <dd className="mt-1 text-sm text-white">{value}</dd>
        </div>
    );
}

function VehiclesTab({ member }) {
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        brand_model: '',
        plate: '',
        year: '',
        color: '',
        engine_cc: '',
        license_expiry: '',
        insurance_company: '',
        insurance_policy: '',
        insurance_expiry: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('members.vehicles.store', member.id), {
            onSuccess: () => { reset(); setShowForm(false); },
        });
    };

    return (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Motos</h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700"
                >
                    {showForm ? 'Cancelar' : 'Adicionar Moto'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={submit} className="mb-6 space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Marca/Modelo" error={errors.brand_model}>
                            <input type="text" value={data.brand_model} onChange={(e) => setData('brand_model', e.target.value)} className="input" />
                        </Field>
                        <Field label="Placa" error={errors.plate}>
                            <input type="text" value={data.plate} onChange={(e) => setData('plate', e.target.value)} className="input" />
                        </Field>
                        <Field label="Ano" error={errors.year}>
                            <input type="number" value={data.year} onChange={(e) => setData('year', e.target.value)} className="input" />
                        </Field>
                        <Field label="Cor" error={errors.color}>
                            <input type="text" value={data.color} onChange={(e) => setData('color', e.target.value)} className="input" />
                        </Field>
                        <Field label="Cilindrada" error={errors.engine_cc}>
                            <input type="number" value={data.engine_cc} onChange={(e) => setData('engine_cc', e.target.value)} className="input" />
                        </Field>
                        <Field label="Validade Licenciamento" error={errors.license_expiry}>
                            <input type="date" value={data.license_expiry} onChange={(e) => setData('license_expiry', e.target.value)} className="input" />
                        </Field>
                    </div>
                    <button type="submit" disabled={processing} className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50">
                        Salvar
                    </button>
                </form>
            )}

            {member.vehicles?.length > 0 ? (
                <div className="space-y-4">
                    {member.vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="rounded-lg border border-gray-700 bg-gray-800 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-white">{vehicle.brand_model}</p>
                                    <p className="text-sm text-gray-400">Placa: {vehicle.plate}</p>
                                </div>
                                <div className="text-right text-sm text-gray-400">
                                    {vehicle.year && <p>{vehicle.year}</p>}
                                    {vehicle.color && <p>{vehicle.color}</p>}
                                    {vehicle.engine_cc && <p>{vehicle.engine_cc}cc</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Nenhuma moto cadastrada.</p>
            )}
        </div>
    );
}

function DocumentsTab({ member }) {
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        type: 'cnh',
        number: '',
        expiry_date: '',
        file: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('members.documents.store', member.id), {
            onSuccess: () => { reset(); setShowForm(false); },
        });
    };

    return (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Documentos</h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700"
                >
                    {showForm ? 'Cancelar' : 'Adicionar Documento'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={submit} className="mb-6 space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Field label="Tipo" error={errors.type}>
                            <select value={data.type} onChange={(e) => setData('type', e.target.value)} className="input">
                                <option value="cnh">CNH</option>
                                <option value="comprovante_residencia">Comprovante de Residência</option>
                                <option value="outro">Outro</option>
                            </select>
                        </Field>
                        <Field label="Número" error={errors.number}>
                            <input type="text" value={data.number} onChange={(e) => setData('number', e.target.value)} className="input" />
                        </Field>
                        <Field label="Validade" error={errors.expiry_date}>
                            <input type="date" value={data.expiry_date} onChange={(e) => setData('expiry_date', e.target.value)} className="input" />
                        </Field>
                    </div>
                    <Field label="Arquivo" error={errors.file}>
                        <input type="file" onChange={(e) => setData('file', e.target.files[0])} className="input" />
                    </Field>
                    <button type="submit" disabled={processing} className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50">
                        Salvar
                    </button>
                </form>
            )}

            {member.documents?.length > 0 ? (
                <div className="space-y-3">
                    {member.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4">
                            <div>
                                <p className="font-medium text-white capitalize">{doc.type.replace('_', ' ')}</p>
                                {doc.number && <p className="text-sm text-gray-400">Nº: {doc.number}</p>}
                                {doc.expiry_date && (
                                    <p className="text-sm text-gray-400">
                                        Validade: {new Date(doc.expiry_date).toLocaleDateString('pt-BR')}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <a
                                    href={route('members.documents.download', [member.id, doc.id])}
                                    className="rounded bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600"
                                >
                                    Download
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Nenhum documento cadastrado.</p>
            )}
        </div>
    );
}

function HealthTab({ member }) {
    const health = member.health;
    const { data, setData, post, processing, errors } = useForm({
        blood_type: health?.blood_type || '',
        allergies: health?.allergies || '',
        medical_conditions: health?.medical_conditions || '',
        medications: health?.medications || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('members.health.store', member.id));
    };

    return (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-medium text-yellow-400">Dados de Saúde</h3>
            <p className="mb-4 text-sm text-gray-400">Dados de uso emergencial - acesso restrito</p>

            <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field label="Tipo Sanguíneo" error={errors.blood_type}>
                        <select value={data.blood_type} onChange={(e) => setData('blood_type', e.target.value)} className="input">
                            <option value="">Selecione</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </Field>
                </div>
                <Field label="Alergias" error={errors.allergies}>
                    <textarea value={data.allergies} onChange={(e) => setData('allergies', e.target.value)} className="input" rows={2} />
                </Field>
                <Field label="Condições Médicas" error={errors.medical_conditions}>
                    <textarea value={data.medical_conditions} onChange={(e) => setData('medical_conditions', e.target.value)} className="input" rows={2} />
                </Field>
                <Field label="Medicamentos de Uso Contínuo" error={errors.medications}>
                    <textarea value={data.medications} onChange={(e) => setData('medications', e.target.value)} className="input" rows={2} />
                </Field>
                <button type="submit" disabled={processing} className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50">
                    Salvar
                </button>
            </form>
        </div>
    );
}

function FiscalTab({ member }) {
    const fiscal = member.fiscal;
    return (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="mb-4 text-lg font-medium text-white">Financeiro</h3>
            <div className="mb-6">
                <p className="text-sm text-gray-400">Status da Mensalidade</p>
                <p className={`text-lg font-semibold ${
                    fiscal?.monthly_fee_status === 'paid' ? 'text-green-400' :
                    fiscal?.monthly_fee_status === 'overdue' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                    {fiscal?.monthly_fee_status === 'paid' ? 'Em dia' :
                     fiscal?.monthly_fee_status === 'overdue' ? 'Atrasado' : 'Pendente'}
                </p>
            </div>

            {member.payments?.length > 0 && (
                <div>
                    <h4 className="mb-3 text-sm font-medium text-gray-400">Histórico de Pagamentos</h4>
                    <div className="space-y-2">
                        {member.payments.map((payment) => (
                            <div key={payment.id} className="flex items-center justify-between rounded border border-gray-700 bg-gray-800 p-3">
                                <div>
                                    <p className="text-sm text-white">{payment.description || 'Mensalidade'}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(payment.payment_date).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                                <span className="text-sm text-green-400">R$ {parseFloat(payment.amount).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function Field({ label, error, children }) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">{label}</label>
            {children}
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>
    );
}
