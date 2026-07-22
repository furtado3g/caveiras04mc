<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\MemberFiscal;
use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@caveiras.com.br',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        $adminMember = Member::create([
            'user_id' => $admin->id,
            'full_name' => 'Admin Caveira',
            'full_address' => 'Rua do Motoclube, 123 - São Paulo/SP',
            'birth_date' => '1985-06-15',
            'spouse_name' => null,
            'work_address' => 'Rua do Motoclube, 123',
            'mobile_phone' => '(11) 99999-9999',
            'emergency_contact_name' => 'Contato Emergência',
            'emergency_contact_phone' => '(11) 98888-8888',
            'previous_mc_member' => false,
            'club_join_date' => '2020-01-01',
            'cpf' => '12345678901',
            'rg' => '123456789',
            'status' => 'member',
        ]);

        MemberFiscal::create([
            'member_id' => $adminMember->id,
            'monthly_fee_status' => 'paid',
        ]);

        Vehicle::create([
            'member_id' => $adminMember->id,
            'brand_model' => 'Harley-Davidson Street Bob',
            'plate' => 'ABC1D23',
            'year' => 2023,
            'color' => 'Preto',
            'engine_cc' => 1870,
        ]);

        $diretor = User::create([
            'name' => 'Diretor Teste',
            'email' => 'diretor@caveiras.com.br',
            'password' => Hash::make('password'),
            'role' => 'diretoria',
            'email_verified_at' => now(),
        ]);

        $diretorMember = Member::create([
            'user_id' => $diretor->id,
            'full_name' => 'Diretor Teste',
            'full_address' => 'Avenida do Motoclube, 456 - São Paulo/SP',
            'birth_date' => '1990-03-20',
            'spouse_name' => 'Maria',
            'work_address' => 'Avenida do Motoclube, 456',
            'mobile_phone' => '(11) 97777-7777',
            'emergency_contact_name' => 'João Emergência',
            'emergency_contact_phone' => '(11) 96666-6666',
            'previous_mc_member' => true,
            'previous_mc_name' => 'Outro MC',
            'club_join_date' => '2019-05-10',
            'cpf' => '98765432100',
            'rg' => '987654321',
            'status' => 'veteran',
        ]);

        MemberFiscal::create([
            'member_id' => $diretorMember->id,
            'monthly_fee_status' => 'paid',
        ]);

        Vehicle::create([
            'member_id' => $diretorMember->id,
            'brand_model' => 'Honda CB 500F',
            'plate' => 'XYZ9A87',
            'year' => 2022,
            'color' => 'Vermelho',
            'engine_cc' => 500,
        ]);
    }
}
