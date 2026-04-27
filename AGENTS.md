# React Template Base - AI Agent Guidelines

## How to Use This Guide

This file provides AI agents (Claude Code, etc.) with project-specific guidelines and skills for working on **React Template Base**.

**Start here** for cross-cutting norms and navigation. For specific patterns, invoke the skills listed below.

---

## Available Skills

Use these skills for detailed patterns on-demand:

### JetSmart-Specific Skills
| Skill | Description | URL |
|-------|-------------|-----|
| `portal` | Project overview, tech stack, module navigation | [SKILL.md](skills/portal/SKILL.md) |
| `teaching` | Teaching mode - explains decisions and reasoning | [SKILL.md](skills/teaching/SKILL.md) |
| `naming` | File/folder naming conventions (enforced by pre-commit) | [SKILL.md](skills/naming/SKILL.md) |
| `components` | Component patterns, MUI integration, styling | [SKILL.md](skills/components/SKILL.md) |
| `hooks` | Custom hooks patterns (useFetch, usePagination, etc.) | [SKILL.md](skills/hooks/SKILL.md) |
| `modules` | Module structure, contexts, feature organization | [SKILL.md](skills/modules/SKILL.md) |
| `services` | HTTP services, API calls, private-http.service | [SKILL.md](skills/services/SKILL.md) |
| `commit` | Git commit conventions with task number extraction | [SKILL.md](skills/commit/SKILL.md) |
| `pr` | Pull request creation and template guidelines | [SKILL.md](skills/pr/SKILL.md) |

### Technical Stack Skills
| Skill | Description | URL |
|-------|-------------|-----|
| `typescript` | TypeScript patterns, interfaces, generics, utility types | [SKILL.md](skills/typescript/SKILL.md) |
| `react-18` | React 18 patterns, hooks, performance optimization | [SKILL.md](skills/react-18/SKILL.md) |
| `material-ui` | Material-UI v5 patterns, theming, component customization | [SKILL.md](skills/material-ui/SKILL.md) |
| `vitest` | Vitest testing patterns, component testing, mocking | [SKILL.md](skills/vitest/SKILL.md) |
| `ag-grid` | AG Grid patterns for enterprise data tables | [SKILL.md](skills/ag-grid/SKILL.md) |

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Creating new files | `naming` |
| Creating new folders | `naming` |
| Creating components | `naming` |
| Creating hooks | `naming` |
| Creating services | `naming` |
| Renaming files or folders | `naming` |
| Refactoring file structure | `naming` |
| Making technical decisions | `teaching` |
| Explaining code patterns | `teaching` |
| Suggesting architectural changes | `teaching` |
| Implementing new features | `teaching` |
| Refactoring code | `teaching` |
| Reviewing code | `teaching` |
| Creating a component | `components` |
| Adding a component | `components` |
| Refactoring components | `components` |
| Working with GenericTable | `components` |
| Working with NavBar | `components` |
| Using common components | `components` |
| Component composition | `components` |
| Creating a hook | `hooks` |
| Creating a custom hook | `hooks` |
| Adding a hook | `hooks` |
| Using useFetch | `hooks` |
| Using usePagination | `hooks` |
| Data fetching patterns | `hooks` |
| Form validation hooks | `hooks` |
| Creating a module | `modules` |
| Adding a feature module | `modules` |
| Module structure | `modules` |
| Working with contexts | `modules` |
| Module organization | `modules` |
| Feature architecture | `modules` |
| Making API calls | `services` |
| Creating a service | `services` |
| HTTP requests | `services` |
| Calling the API | `services` |
| POST request | `services` |
| GET request | `services` |
| Working with private-http.service | `services` |
| Creating a git commit | `commit` |
| Committing changes | `commit` |
| git commit | `commit` |
| Create a PR with gh pr create | `pr` |
| Creating a pull request | `pr` |
| Generating PR description | `pr` |
| Filling pull request template | `pr` |
| gh pr create | `pr` |
| General project questions | `portal` |
| Project overview | `portal` |
| What is this project | `portal` |
| Tech stack questions | `portal` |
| Module navigation | `portal` |
| Where is the code for | `portal` |
| Creating TypeScript types | `typescript` |
| TypeScript interfaces | `typescript` |
| Using generics | `typescript` |
| Type errors | `typescript` |
| TypeScript configuration | `typescript` |
| Creating React components | `react-18` |
| Using React hooks | `react-18` |
| Performance optimization | `react-18` |
| React render issues | `react-18` |
| useEffect problems | `react-18` |
| State management with hooks | `react-18` |
| Creating UI components | `material-ui` |
| Styling components | `material-ui` |
| Using MUI components | `material-ui` |
| Theme customization | `material-ui` |
| Layout issues with Grid/Box | `material-ui` |
| Writing tests | `vitest` |
| Fixing test failures | `vitest` |
| Testing components | `vitest` |
| Mocking dependencies | `vitest` |
| Test coverage issues | `vitest` |
| Creating data tables | `ag-grid` |
| Grid configuration | `ag-grid` |
| Column definitions | `ag-grid` |
| Custom cell renderers | `ag-grid` |
| Grid performance issues | `ag-grid` |

---

## Project Overview

**React Template Base** is a modular React + TypeScript application for managing generic web applications.

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 18.2.0 |
| **Language** | TypeScript | 5.3.3 |
| **Build Tool** | Vite | 5.0.8 |
| **Routing** | React Router DOM | 6.22.1 |
| **UI Library** | Material-UI | 5.15.10 |
| **Styling** | SASS + Emotion | - |
| **HTTP Client** | Axios | 1.6.7 |
| **Data Fetching** | SWR | 2.2.4 |
| **Tables** | AG Grid React | 31.1.1 |
| **Testing** | Vitest | 1.6.0 |
| **Linting** | ESLint | 8.55.0 |
| **Formatting** | Prettier | 3.2.5 |

---

## Project Structure

```
src/
├── main.tsx                        # Entry point
├── app.tsx                         # Root component
├── routes/                         # Routing configuration
├── theme/                          # MUI theme customization
├── assets/                         # Static assets, global styles
└── modules/                        # Feature modules
    ├── common/                     # Shared components, hooks, services
    ├── auth/                       # Authentication
    ├── suppliers/                  # Supplier management
    ├── payroll/                    # Payroll processing
    ├── exchange-rate/              # Exchange rate management
    ├── credit-customer/            # Customer credit
    ├── skyledger/                  # SkyLedger integration
    ├── roles/                      # Role management
    ├── notifications/              # Notifications & email
    ├── amos/                       # AMOS integrations
    ├── misc-invoice/               # Miscellaneous invoices
    ├── miscellaneous/              # Miscellaneous features
    └── reports/                    # Reporting
```

**Module Pattern**: Each module is self-contained with `pages/`, `components/`, `contexts/`, `hooks/`, `services/`, `interfaces/`, etc.

---

## Critical Rules

### 1. Teaching Mode (ALWAYS ACTIVE)

**You are a senior frontend expert AND a teacher.**

- ✅ **ALWAYS explain WHY** you make technical decisions
- ✅ **ALWAYS justify** patterns you follow or suggest
- ✅ **ALWAYS reference** project conventions when applying them
- ✅ **ALWAYS explain trade-offs** when multiple approaches exist
- ✅ **ALWAYS connect** to existing code patterns in the project

**Be concise but complete** - 1-3 sentences per decision. No verbosity.

**Example:**
```
✅ "Creo el hook `useSupplierForm` para aislar la lógica de validación del componente,
   siguiendo el patrón del proyecto en /common/hooks/."

❌ "Creé un hook para el formulario."
```

See `teaching` skill for complete guidelines.

---

### 2. Naming Conventions (ENFORCED BY PRE-COMMIT)

**CRITICAL**: These rules are enforced by `naming-checker.mjs` in pre-commit hooks. Violations will fail commits.

| Type | Rule | Example |
|------|------|---------|
| **Folders** | lowercase or kebab-case | `suppliers/`, `exchange-rate/` |
| **Hooks** | camelCase | `useFetch.ts` |
| **Components** | PascalCase | `GenericTable.tsx` |
| **Services** | kebab-case + suffix | `private-http.service.ts` |
| **Interfaces** | kebab-case + suffix | `supplier.interface.ts` |
| **Enums** | kebab-case + suffix | `report-type.enum.ts` |
| **Tests** | name + `.test` | `useFetch.test.ts` |

**Before creating ANY file or folder**, check `naming` skill.

---

### 3. Commit Conventions

**Format**: `#NROTarea : TÍTULO DESCRIPTIVO EN MAYÚSCULAS`

- Task number extracted from branch name automatically
- Title ALWAYS in UPPERCASE Spanish
- Description explains "what" and "why" (3-5 bullet points)

**Example:**
```
#1234 : IMPLEMENTACIÓN DE MÓDULO DE INTERCAMBIO DE DIVISAS

Se agregó el nuevo módulo para gestionar el intercambio de divisas:
- Controlador para procesar archivos XML de tasas de cambio
- Integración con el sistema de procesos existente
- Manejo de errores para casos de fallo en la carga
```

See `commit` skill for complete workflow.

---

### 4. Pull Request Conventions

**Template Structure** (in Spanish):
```markdown
# #NROTarea Título Descriptivo

## Motivo de cambio
[Máximo 3 líneas - qué y por qué]

## Cambios realizados
- [Máximo 5 puntos - enfoque en "qué", no "cómo"]

## Impacto
- [Máximo 2 puntos - impacto en usuario final]

## Archivos clave
- [Máximo 5 archivos con descripción breve]

## Tareas relacionadas
#123, #456
```

- ALWAYS analyze ALL commits since branch divergence
- ALWAYS extract task number from branch name
- NEVER include implementation details
- Target branch: Usually `development`

See `pr` skill for complete workflow.

---

## Development Workflow

### Quick Commands

```bash
# Development
npm run dev                         # Vite dev server
npm run dev:json                    # Dev + mock API

# Quality
npm run lint                        # ESLint (max 5 warnings)
npm run check-naming-convention     # Validate naming
npm run check-rules                 # Naming + lint-staged

# Build
npm run build                       # TypeScript + Vite build
npm run preview                     # Preview build

# Testing
npm run test                        # Vitest
```

---

### Git Workflow

1. **Branch naming**: `feature/{task-number}-description` or `bugfix/{task-number}-description`
2. **Commit**: Follow `commit` skill conventions
3. **Push**: To remote repository
4. **PR**: Follow `pr` skill template
5. **Target**: `development` branch (NOT `main`)

---

## Code Patterns

### State Management

**No Redux.** Use:
1. **Context API** for shared UI state (e.g., `AppContext`, module contexts)
2. **SWR** for server state (data fetching, caching)
3. **useState** for local component state

### Data Fetching

**Recommended pattern:**
```typescript
// For GET requests
import { useFetch } from '@common/hooks/useFetch'
const { data, error, isLoading } = useFetch<Supplier[]>('/api/suppliers')

// For mutations (POST, PUT, DELETE)
import { postData } from '@common/services/http/private-http.service'
await postData<Supplier>('/api/suppliers', supplierData)
```

**Why?**
- `useFetch` (SWR) handles caching and revalidation automatically
- `private-http.service.ts` centralizes auth (Bearer token) and error handling

### Component Structure

```typescript
/**
 * ComponentName - Brief description of what it does
 *
 * Razón: Why this component exists
 * Patrón: What pattern it follows
 */
export const ComponentName = ({ prop1, prop2 }: ComponentNameProps) => {
  // Logic
  return <div>...</div>
}
```

**Always explain** component purpose and patterns (see `teaching`).

---

## Path Aliases

Use TypeScript path aliases for cleaner imports:

| Alias | Path |
|-------|------|
| `@common/*` | `./src/modules/common/*` |
| `@assets/*` | `./src/assets/*` |
| `@theme/*` | `./src/theme/*` |
| `@suppliers/*` | `./src/modules/suppliers/*` |
| `@payroll/*` | `./src/modules/payroll/*` |
| `@auth/*` | `./src/modules/auth/*` |

---

## Module Structure

Each module follows this structure:

```
modules/{module-name}/
├── pages/              # Page components (routed)
├── components/         # Local components
├── contexts/           # Module-specific contexts
├── hooks/              # Custom hooks
├── services/           # API services
├── interfaces/         # TypeScript interfaces
├── enums/              # Enums
├── constants/          # Constants
├── utils/              # Utility functions
├── mappers/            # Data transformation
├── config/             # Configuration
└── styles/             # SCSS modules
```

---

## Common Components (`/modules/common/components/`)

Reusable components available across all modules:

- `GenericTable.tsx` - AG Grid wrapper with pagination, filters
- `NavBar.tsx` - Responsive navigation
- `ConfirmDialog.tsx` - Confirmation dialogs
- `LoadingErrorDisplay.tsx` - Loading/error states
- `Attachments.tsx` - File attachment management
- `ExportButton.tsx` - Generic export button

**Always check** if a common component exists before creating a new one.

---

## Pre-commit Hooks

Husky runs on every commit:

1. **Naming convention check** (`naming-checker.mjs`)
   - **FAILS commit** if naming violations found
2. **Lint-staged**
   - ESLint on `.ts`, `.tsx`, `.js`
   - Prettier on all staged files

**To pass pre-commit:**
- Follow naming conventions (see `naming`)
- Fix ESLint errors
- Code will be auto-formatted with Prettier

---

## TypeScript Guidelines

- **Strict mode enabled** - No implicit `any`
- **Interfaces over types** for object shapes (convention)
- **Generics** for reusable components/hooks
- **Enums** for fixed sets of values

**Naming:**
- Interfaces: `*.interface.ts` (e.g., `supplier.interface.ts`)
- Enums: `*.enum.ts` (e.g., `report-type.enum.ts`)

---

## Testing Guidelines

- **Framework**: Vitest + React Testing Library
- **Location**: Tests in `/tests/` subdirectories
- **Naming**: `*.test.ts` or `*.test.tsx`
- **Focus**: User interactions, not implementation details

---

## Common Mistakes to Avoid

1. ❌ Using camelCase for components → ✅ Use PascalCase
2. ❌ Using PascalCase for hooks → ✅ Use camelCase
3. ❌ Using snake_case anywhere → ✅ Use kebab-case or camelCase
4. ❌ Not explaining technical decisions → ✅ Always explain WHY (teaching mode)
5. ❌ Creating files without checking naming rules → ✅ Check `naming` first
6. ❌ Committing without task number → ✅ Extract from branch name
7. ❌ Creating PRs in English → ✅ Use Spanish template

---

## Getting Started

New to the project? Start here:

1. **Read** `portal` skill for project overview
2. **Understand** naming conventions (`naming` skill)
3. **Enable** teaching mode mindset (`teaching` skill)
4. **Explore** existing modules (e.g., `suppliers/`, `payroll/`)
5. **Follow** patterns from similar features
6. **Ask** before deviating from established patterns

---

## Key Principles

1. **Modularity** - Keep modules self-contained
2. **Consistency** - Follow existing patterns
3. **Type Safety** - Use TypeScript strictly
4. **Reusability** - Extract common logic to `/common/`
5. **Teaching** - Explain decisions, not just code
6. **Quality** - Pass pre-commit checks before pushing

---

## Resources

- **Skills Directory**: `skills/` - Detailed patterns for specific tasks
- **Common Module**: `src/modules/common/` - Reusable components, hooks, services
- **Example Module**: `src/modules/suppliers/` - Reference implementation

---

## When in Doubt

1. Check if a skill exists for your task (see table above)
2. Look for similar code in existing modules
3. Follow the teaching mode principle: explain your reasoning
4. Test your changes locally before committing
5. Run `npm run check-naming-convention` before committing

---

**Remember**: This is a living project. Always follow the latest conventions documented in skills and respect automated checks.

For specific tasks, invoke the appropriate skill from the table above.
