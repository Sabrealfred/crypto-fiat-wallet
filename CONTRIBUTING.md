
# Contribución al Proyecto

## Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
├── pages/            # Páginas de la aplicación
│   ├── commercial/   # Banca comercial
│   ├── business/     # Banca empresarial
│   ├── private/      # Banca privada
│   └── developers/   # Portal desarrolladores
├── hooks/            # Hooks personalizados
├── lib/              # Utilidades
├── types/            # Tipos TypeScript
└── integrations/     # Integraciones externas
```

## Guías de Desarrollo

### 1. Estándares de Código

- Usar TypeScript estricto
- Seguir principios SOLID
- Implementar pruebas unitarias
- Documentar componentes principales

### 2. Flujo de Trabajo Git

1. Crear branch desde `main`
2. Desarrollar feature/fix
3. Crear Pull Request
4. Code Review
5. Merge a `main`

### 3. Convenciones de Commits

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios de estilo
refactor: refactorización de código
test: adición/modificación de tests
```

### 4. Pull Requests

- Descripción clara del cambio
- Screenshots si hay cambios visuales
- Lista de cambios realizados
- Pruebas realizadas

### 5. Desarrollo de Componentes

- Componentes atómicos
- Props tipadas
- Documentación de uso
- Ejemplos de implementación

## Pruebas

### Unitarias
- Jest + React Testing Library
- Cobertura mínima: 80%

### E2E
- Cypress
- Escenarios críticos

## Despliegue

1. Desarrollo local
2. Staging
3. Producción

## Contacto

Para dudas o sugerencias, crear un issue en el repositorio.
