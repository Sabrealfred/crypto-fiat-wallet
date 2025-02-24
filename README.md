
# Banking Platform

Una plataforma bancaria moderna construida con React, TypeScript y Supabase.

## Características

- 🏦 Múltiples perfiles bancarios (Personal, Comercial, Empresarial)
- 🔒 Autenticación segura
- 💳 Gestión de pagos y transacciones
- 📊 Análisis y reportes
- 🌐 Soporte multimoneda
- 🛠 Portal para desarrolladores

## Requisitos previos

- Node.js 18 o superior
- npm o pnpm
- Git
- [Supabase CLI](https://supabase.com/docs/guides/cli) (para desarrollo local)

## Configuración del proyecto

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd banking-platform
```

### 2. Instalar dependencias

```bash
npm install
# o
pnpm install
```

### 3. Configuración de Supabase

#### Opción A: Usar Supabase Cloud (Recomendado para empezar)

1. Crear una cuenta en [Supabase](https://supabase.com)
2. Crear un nuevo proyecto
3. Copiar las credenciales del proyecto (URL y anon/public key)
4. Ir a SQL Editor en el dashboard de Supabase
5. Ejecutar las siguientes migraciones iniciales:

```sql
-- Crear tipos enumerados
CREATE TYPE profile_type AS ENUM ('personal', 'business', 'commercial', 'private_banking', 'developer');
CREATE TYPE account_type AS ENUM ('savings', 'checking', 'investment', 'credit');
CREATE TYPE business_type AS ENUM ('personal', 'business', 'commercial', 'private_banking');
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'closed', 'escalated');
CREATE TYPE user_role AS ENUM ('admin', 'user', 'auditor', 'operator');

-- Crear tabla de perfiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    address TEXT,
    birth_date DATE,
    phone_number TEXT,
    kyc_status TEXT DEFAULT 'pending',
    preferred_currency TEXT DEFAULT 'USD',
    preferred_language TEXT DEFAULT 'en',
    two_fa_enabled BOOLEAN DEFAULT false,
    role_id UUID,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    profile_type profile_type NOT NULL,
    business_name TEXT,
    tax_id TEXT,
    industry TEXT,
    company_size TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Crear tabla de monedas
CREATE TABLE IF NOT EXISTS public.currencies (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    exchange_rate NUMERIC DEFAULT 1.0,
    is_active BOOLEAN DEFAULT true,
    last_updated TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Crear tabla de billeteras
CREATE TABLE IF NOT EXISTS public.wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    currency TEXT NOT NULL,
    currency_code TEXT REFERENCES public.currencies(code),
    balance NUMERIC DEFAULT 0,
    wallet_type TEXT NOT NULL,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear tabla de transacciones
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    wallet_id UUID NOT NULL REFERENCES public.wallets(id),
    amount NUMERIC NOT NULL,
    currency TEXT NOT NULL,
    transaction_type TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    recipient_address TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear tabla de notificaciones
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL,
    amount NUMERIC,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Crear función para manejar la actualización de timestamps
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear función para manejar nuevos usuarios
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear triggers
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_wallets_updated_at
    BEFORE UPDATE ON public.wallets
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_transactions_updated_at
    BEFORE UPDATE ON public.transactions
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Insertar algunas monedas básicas
INSERT INTO public.currencies (code, name, symbol) VALUES
    ('USD', 'US Dollar', '$'),
    ('EUR', 'Euro', '€'),
    ('GBP', 'British Pound', '£'),
    ('JPY', 'Japanese Yen', '¥')
ON CONFLICT (code) DO NOTHING;

-- Configurar políticas de seguridad (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Crear políticas
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can view own user profiles"
    ON public.user_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view own wallets"
    ON public.wallets FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions"
    ON public.transactions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view own notifications"
    ON public.notifications FOR SELECT
    USING (auth.uid() = user_id);
```

#### Opción B: Supabase Local

1. Instalar Supabase CLI:
```bash
npm install -g supabase
```

2. Iniciar Supabase localmente:
```bash
supabase start
```

3. Ejecutar las migraciones:
- Copiar el SQL anterior en un archivo `supabase/migrations/00000000000000_init.sql`
- Ejecutar:
```bash
supabase db reset
```

### 4. Variables de entorno

El proyecto utiliza las siguientes variables de Supabase que deben estar configuradas:

```ts
SUPABASE_URL="tu-url-de-supabase"
SUPABASE_ANON_KEY="tu-llave-anonima"
```

Estas variables ya están configuradas si usas Lovable, pero si desarrollas localmente necesitarás configurarlas.

## Desarrollo local

### Iniciar el servidor de desarrollo

```bash
npm run dev
# o
pnpm dev
```

El servidor se iniciará en `http://localhost:8080`

### Comandos disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Vista previa de la construcción de producción
- `npm run lint`: Ejecuta el linter
- `npm run test`: Ejecuta las pruebas

## Estructura del proyecto

```
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── pages/            # Páginas de la aplicación
│   ├── hooks/            # Hooks personalizados
│   ├── lib/              # Utilidades y configuraciones
│   ├── types/            # Definiciones de tipos TypeScript
│   └── integrations/     # Integraciones (Supabase, etc.)
├── supabase/
│   ├── migrations/       # Migraciones de la base de datos
│   └── functions/        # Edge Functions
└── public/              # Archivos estáticos
```

## Base de datos

### Tablas principales

- `profiles`: Perfiles de usuario
- `accounts`: Cuentas bancarias
- `transactions`: Transacciones
- `wallets`: Billeteras digitales
- `cards`: Tarjetas
- `notifications`: Notificaciones

### Ejecutar migraciones

Para ejecutar las migraciones en Supabase local:

```bash
supabase migration up
```

Para revertir la última migración:

```bash
supabase migration down
```

## Despliegue

### Usando Lovable

1. Abrir el proyecto en [Lovable](https://lovable.dev)
2. Hacer clic en el botón "Deploy"

### Despliegue manual

1. Construir el proyecto:
```bash
npm run build
```

2. Desplegar la carpeta `dist` en tu servicio de hosting preferido

## Seguridad

- Todas las operaciones sensibles están protegidas por RLS (Row Level Security) en Supabase
- Autenticación implementada con Supabase Auth
- Tokens JWT para manejo de sesiones

## Contribuir

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Soporte

Para soporte y preguntas:
- Crear un issue en el repositorio
- Contactar al equipo de desarrollo

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
