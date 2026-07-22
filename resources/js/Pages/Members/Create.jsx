import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        full_address: '',
        birth_date: '',
        spouse_name: '',
        work_address: '',
        mobile_phone: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        previous_mc_member: false,
        previous_mc_name: '',
        club_join_date: '',
        cpf: '',
        rg: '',
        status: 'member',
        email: '',
        password: '',
        password_confirmation: '',
        photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('members.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-white">Novo Membro</h2>}
        >
            <Head title="Novo Membro" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
                        <Section title="Dados Pessoais">
                            <Field label="Nome Completo" error={errors.full_name}>
                                <input type="text" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} className="input" />
                            </Field>
                            <Field label="Data de Nascimento" error={errors.birth_date}>
                                <input type="date" value={data.birth_date} onChange={(e) => setData('birth_date', e.target.value)} className="input" />
                            </Field>
                            <Field label="Endereço Completo" error={errors.full_address}>
                                <textarea value={data.full_address} onChange={(e) => setData('full_address', e.target.value)} className="input" rows={2} />
                            </Field>
                            <Field label="Cônjuge" error={errors.spouse_name}>
                                <input type="text" value={data.spouse_name} onChange={(e) => setData('spouse_name', e.target.value)} className="input" />
                            </Field>
                            <Field label="Endereço de Trabalho" error={errors.work_address}>
                                <input type="text" value={data.work_address} onChange={(e) => setData('work_address', e.target.value)} className="input" />
                            </Field>
                        </Section>

                        <Section title="Contato">
                            <Field label="Celular (com DDD)" error={errors.mobile_phone}>
                                <input type="text" value={data.mobile_phone} onChange={(e) => setData('mobile_phone', e.target.value)} placeholder="(11) 99999-9999" className="input" />
                            </Field>
                            <Field label="Contato de Emergência" error={errors.emergency_contact_name}>
                                <input type="text" value={data.emergency_contact_name} onChange={(e) => setData('emergency_contact_name', e.target.value)} className="input" />
                            </Field>
                            <Field label="Telefone do Contato de Emergência" error={errors.emergency_contact_phone}>
                                <input type="text" value={data.emergency_contact_phone} onChange={(e) => setData('emergency_contact_phone', e.target.value)} placeholder="(11) 99999-9999" className="input" />
                            </Field>
                        </Section>

                        <Section title="Dados do Motoclube">
                            <Field label="Data de Ingresso no Clube" error={errors.club_join_date}>
                                <input type="date" value={data.club_join_date} onChange={(e) => setData('club_join_date', e.target.value)} className="input" />
                            </Field>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="previous_mc_member" checked={data.previous_mc_member} onChange={(e) => setData('previous_mc_member', e.target.checked)} className="rounded border-gray-600 bg-gray-800 text-yellow-500" />
                                <label htmlFor="previous_mc_member" className="text-sm text-gray-300">Já fez parte de outro MC?</label>
                            </div>
                            {data.previous_mc_member && (
                                <Field label="Nome do MC Anterior" error={errors.previous_mc_name}>
                                    <input type="text" value={data.previous_mc_name} onChange={(e) => setData('previous_mc_name', e.target.value)} className="input" />
                                </Field>
                            )}
                            <Field label="Status" error={errors.status}>
                                <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="input">
                                    <option value="prospect">Prospect</option>
                                    <option value="member">Membro</option>
                                    <option value="veteran">Veterano</option>
                                    <option value="inactive">Inativo</option>
                                </select>
                            </Field>
                        </Section>

                        <Section title="Documentos">
                            <Field label="CPF" error={errors.cpf}>
                                <input type="text" value={data.cpf} onChange={(e) => setData('cpf', e.target.value)} placeholder="000.000.000-00" className="input" />
                            </Field>
                            <Field label="RG" error={errors.rg}>
                                <input type="text" value={data.rg} onChange={(e) => setData('rg', e.target.value)} className="input" />
                            </Field>
                        </Section>

                        <Section title="Foto de Perfil">
                            <input type="file" onChange={(e) => setData('photo', e.target.files[0])} accept="image/*" className="input" />
                        </Section>

                        <Section title="Conta de Acesso">
                            <Field label="E-mail" error={errors.email}>
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="input" />
                            </Field>
                            <Field label="Senha" error={errors.password}>
                                <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="input" />
                            </Field>
                            <Field label="Confirmar Senha" error={errors.password_confirmation}>
                                <input type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="input" />
                            </Field>
                        </Section>

                        <div className="flex items-center justify-end gap-4">
                            <Link href={route('members.index')} className="text-sm text-gray-400 hover:text-white">
                                Cancelar
                            </Link>
                            <button type="submit" disabled={processing} className="rounded-lg bg-yellow-600 px-6 py-2 text-sm font-medium text-white hover:bg-yellow-700 disabled:opacity-50">
                                {processing ? 'Salvando...' : 'Salvar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function Section({ title, children }) {
    return (
        <div className="space-y-4">
            <h3 className="border-b border-gray-800 pb-2 text-lg font-medium text-yellow-400">{title}</h3>
            {children}
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
