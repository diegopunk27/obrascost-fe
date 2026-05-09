# ObrasCost — Frontend

Interfaz web de **ObrasCost**, plataforma de gestión y estimación de costos de obras de construcción. Desarrollada con React 18 + TypeScript + Vite + MUI v5.

## Stack

| Concern | Tecnología |
|---|---|
| UI Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Componentes | MUI v5 (Material UI) |
| Estado servidor | SWR |
| HTTP | Axios |
| Routing | React Router DOM v6 |
| Formato moneda | react-number-format |
| Tests unitarios | Vitest + React Testing Library |
| Linting | ESLint + Prettier + Husky |

## Inicio rápido

```bash
yarn install
yarn dev          # http://localhost:5173
```

> **Backend requerido:** la app consume `http://localhost:4000`. Ver repo `estimaciones-inmuebles-be`.

## Pantallas principales

| Ruta | Descripción |
|---|---|
| `/login` | Autenticación con JWT |
| `/dashboard` | KPIs + tabla de obras |
| `/obras/:id` | Detalle: gastos, estimación, datos |
| `/configuracion` | Gestión de rubros + cuenta |

## Testing

### Unitarios (Vitest + RTL)

```bash
yarn test              # modo watch
yarn test:coverage     # una sola pasada + reporte de cobertura
```

**Cobertura:** 97% en servicios, hooks y componentes críticos (89 tests).  
Los reportes HTML se generan en `coverage/`.

> Las páginas no se incluyen en la cobertura unitaria — son cubiertas por Playwright E2E.

### Qué se testea

| Capa | Tests |
|---|---|
| `services/` | Auth, Obras, Gastos, Rubros — mock de axios, verificación de URLs/headers |
| `hooks/` | useObras, useObra, useGastos, useRubros — cache SWR |
| `components/` | KpiCard, EstimacionPanel, GastoFormDialog, RubrosManager, ObraStatusChip, AppLayout |

## CI/CD (GitHub Actions)

Workflow: [`.github/workflows/lint-checker.yaml`](.github/workflows/lint-checker.yaml)

| Step | Qué hace |
|---|---|
| Naming check | `node naming-checker.mjs` |
| Lint | `eslint` con max 5 warnings |
| Build | `tsc && vite build` |
| Test & Coverage | `vitest run --coverage` — sube artefacto `coverage-fe` |

**Triggers:** push y PR a `main` / `development`.

## Reglas de código

### Naming conventions (enforced por ESLint + naming-checker.mjs)

- Variables, funciones, hooks, servicios: `camelCase`
- Componentes, interfaces, clases, contextos: `PascalCase`
- Constantes globales: `SCREAMING_SNAKE_CASE`
- Archivos y carpetas: `kebab-case` (excepto cuando el tipo lo requiere, ej. `MiComponente.component.tsx`)

### Path aliases

```
@common-components/*  →  src/modules/common/components/*
@common-hooks/*       →  src/modules/common/hooks/*
@common-interfaces/*  →  src/modules/common/interfaces/local/*
@common-services/*    →  src/modules/common/services/*
@global-contexts/*    →  src/modules/global/contexts/*
@routes/*             →  src/routes/*
```

### Estructura modular

```
src/
  modules/
    common/
      components/   Componentes reutilizables
      hooks/        SWR hooks (useObras, useObra, useGastos, useRubros)
      interfaces/   Tipos locales (Obra, Gasto, Rubro, EstimacionResult)
      services/     Auth, Obras, Gastos, Rubros
    global/
      contexts/     AppContext (token JWT, login/logout)
      pages/        LoginPage, DashboardPage, ObraDetailPage, ConfiguracionPage
  routes/           Definición de rutas privadas/públicas
```

## Variables de entorno

El baseURL de axios se configura en `src/modules/common/services/Services.ts`.  
Para cambiar el backend apuntar a la variable correspondiente en ese archivo (por defecto `http://localhost:4000`).
