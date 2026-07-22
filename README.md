# Caveira's MC Brasil - Sistema de Gestão de Motoclube

Sistema web completo para gestão de membros de um motoclube, desenvolvido com as melhores práticas e tecnologias modernas.

## Funcionalidades

- **Gestão de Membros** - Cadastro completo (dados pessoais, contato, documento)
- **RBAC** - 4 perfis: Admin, Diretoria, Membro, Secretaria/Financeiro
- **Módulo de Veículos** - Múltiplas motos por membro com alertas de vencimento
- **Dados de Saúde** - Acesso restrito (membro + diretoria autorizada)
- **Documentos** - Upload CNH, comprovante, controle de validade
- **Financeiro** - Controle de mensalidade + histórico de pagamentos
- **Imagem de Aniversário** - Geração automática via Intervention Image
- **Dashboard** - Estatísticas, alertas, aniversariantes do dia
- **PWA** - App instalável em dispositivos móveis

## Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Backend | Laravel 13, PHP 8.4 |
| Frontend | Inertia.js + React 18 |
| UI | Tailwind CSS v4 |
| Banco (dev) | SQLite |
| Banco (prod) | MySQL |
| Image Gen | Intervention Image |
| Auth | Laravel Breeze (sessão) |
| Queue | Database (compatível com Kafka) |

## Pré-requisitos

- PHP 8.4+ (com extensões: pdo_sqlite, gd, mbstring, xml)
- Composer
- Node.js 18+ e npm
- SQLite (dev) ou MySQL (prod)

## Instalação

```bash
# Clone o repositório
git clone https://github.com/furtado3g/Caveiras04MC.git
cd Caveiras04MC/app

# Instale as dependências PHP
composer install

# Instale as dependências Node.js
npm install

# Copie o arquivo de ambiente
cp .env.example .env

# Gere a chave da aplicação
php artisan key:generate

# Execute as migrations e seed
php artisan migrate:fresh --seed

# Crie o link simbólico de storage
php artisan storage:link

# Build dos assets (produção)
npm run build
```

## Executando o Projeto

### Opção 1: Tudo em um terminal (recomendado)

```bash
npm run dev:all
```

Isso inicia:
- **Vite** (porta 5173) - servidor de assets
- **Queue Worker** - processamento de filas
- **Laravel** (porta 8000) - servidor PHP

### Opção 2: Terminais separados

```bash
# Terminal 1 - Vite
npm run dev

# Terminal 2 - Laravel
php artisan serve

# Terminal 3 - Queue Worker
php artisan queue:work
```

## Acesso

- **URL:** http://localhost:8000
- **Admin:** admin@caveiras.com.br / password
- **Diretor:** diretor@caveiras.com.br / password

## Estrutura do Projeto

```
app/
├── Http/
│   ├── Controllers/     # Controllers (Auth, Member, Vehicle, etc.)
│   ├── Middleware/       # Middleware (RBAC, Inertia)
│   └── Requests/        # Form Requests
├── Jobs/                # Jobs assíncronos
├── Models/              # Models Eloquent
└── Providers/

resources/
├── js/
│   ├── Components/      # Componentes React reutilizáveis
│   ├── Layouts/         # Layouts (Authenticated, Guest)
│   └── Pages/           # Páginas Inertia
│       ├── Auth/        # Login, Register, etc.
│       ├── Members/     # CRUD de membros
│       ├── Birthday/    # Geração de imagens
│       └── Dashboard.jsx
└── css/
```

## Testes

```bash
php artisan test
```

## Deploy (Produção)

1. Configure MySQL no `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=caveiras_mc
   DB_USERNAME=root
   DB_PASSWORD=secret
   ```

2. Execute as migrations:
   ```bash
   php artisan migrate --force
   ```

3. Configure Redis para cache:
   ```
   CACHE_STORE=redis
   QUEUE_CONNECTION=redis
   ```

4. Build dos assets:
   ```bash
   npm run build
   ```

5. Configure o Nginx conforme documentação do Laravel.

## Licença

MIT License - Caveira's MC Brasil
