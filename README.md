
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
5. Ejecutar las migraciones iniciales que se encuentran en `supabase/migrations/`

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
```bash
supabase migration up
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
