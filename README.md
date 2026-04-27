# Contenido

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Installation process](#1-installation-process)
   - [Software dependencies](#2-software-dependencies)
3. [Reglas de convivencia en el código](#reglas-de-convivencia-en-el-código)
   - [Naming conventions](#naming-conventions)
   - [Path aliases e Indexes](#path-aliases-e-indexes)
   - [Comentarios y JSDocs](#comentarios-y-jsdocs)
   - [Reglas de ESlint](#reglas-de-eslint)
4. [Build and Test](#build-and-test)
5. [Contribute](#contribute)

# Introduction

Proyecto base para trabajar con React y TypeScript, creado con vite y gestionado con yarn.

# Getting Started

## 1. Installation process

El gestor de paquetes a usar es `yarn`.

- `yarn install`: para instalar los paquetes (si no detecta las dependencias, hacer `yarn config set nodeLinker node-modules`).

## 2. Software dependencies

### Production dependencies

- `axios` para manejar las requests a API
- `SWR` para manejar el estado de la data a mostrar o usar en los componentes.
- `react-router-dom` para el ruteo.

### Development dependencies

- `@types/node`: para poder enlazar a `vite.config.js` los path aliases declarados en `tsconfig.json`.
- `husky`
- `ESlint`: para garantizar la calidad del código.
- `prettier`: para formatear el código de forma uniforme.
- `eslint-config-prettier`: para garantizar que prettier y ESlint no se pisen al revisar el código.
- `eslint-plugin-jsdoc`: para que el editor nos recuerde de comentar nuestro código.
- `eslint-plugin-project-structure`: para garantizar que se cumplan las naming conventions de los archivos.

# Reglas de convivencia en el código

Acontinuación se dejan asentadas algunas reglas para garantizar que el código se mantenga legible a lo largo de su historia de desarrollo para los devs que lo inicien, lo continuen y lo mantengan.

Regla de Oro: desarrollar y comentar las funcionalidades como a ustedes les serviría que otros devs lo declararan.

## Naming conventions

Como React es un framework de JavaScript, se deben observar las convenciones y buenas prácticas de este lenguaje para asegurar el orden y la uniformidad del código sin importar el background del dev que contribuya al código; si se está desarrollando en JS, lo lógico es que se escriba como se convino para JS, no para Python o PHP. Resumiendo algunas de las [reglas de estilo de AirBnB](https://airbnb.io/javascript/):

- Variables, propiedades de objetos, funciones, parámetros de función, nombres de archivos de hooks y utils: `síOSíEnCamelCase`. Ej: `noHayDeOtra`.
- Constantes (en código y en nombre de archivo): `SCREAMING_SNAKE_CASE`.
- Componentes, interfaces, types, clases, contextos, servicios (y sus archivos relacionados): `PascalCase` (tanto en el código como en el nombre del archivo).
- Acrónimos como HTTP y API: en mayúscula, siguiendo el case determinado anteriormente. Ej: si es una función, `HTTPRequest()`; o una constante, `BACKEND_API`; o una interfaz, `APIResponse`.
- archivos (del tipo que no se haya mencionado antes) y carpetas: `kebab-case`.

En el `README` de cada carpeta dentro de `src`, se agregan algunas cuestiones adicionales a tener en cuenta a la hora de nombrar los archivos que tienen que ver con la terminación a agregarle en base a la función que cumple el archivo (si es una interfaz será `.interface`, o un componente será `.component`, por ejemplo).

A su vez, se agrega la regla de ESlint `project-structure` que se encarga de verificar que se sigan también las reglas de nomenclatura de directorios y archivos; este criterio de nomenclatura puede observarse en el archivo `projectStructure.json` como así también modificarse a gusto del equipo que se encargue del proyecto.

## Path aliases e Indexes

Emplear este modo de importación permite tener un código más ordenado y prolijo. En el archivo `tsconfig.json`, en la propiedad `compilerOptions.paths` se especifican todos los path aliases. Inicialmente, los paths especificados son los siguientes:

```json
   "paths": {
      "@common-assets/*": ["./src/modules/common/assets/*"],
      "@common-components/*": ["./src/modules/common/components/*"],
      "@common-constants/*": ["./src/modules/common/constants/*"],
      "@common-contexts/*": ["./src/modules/common/contexts/*"],
      "@common-hooks/*": ["./src/modules/common/hooks/*"],
      "@common-interfaces/*": ["./src/modules/common/interfaces/local/*"],
      "@common-pages/*": ["./src/modules/common/pages/*"],
      "@common-requests/*": ["./src/modules/common/interfaces/api/requests/*"],
      "@common-responses/*": ["./src/modules/common/interfaces/api/responses/*"],
      "@common-service-models/*": ["./src/modules/common/interfaces/api/services/*"],
      "@common-services/*": ["./src/modules/common/services/*"],
      "@global-constants/*": ["./src/modules/global/constants/*"],
      "@global-contexts/*": ["./src/modules/global/contexts/*"],
      "@global-pages/*": ["./src/modules/global/pages/*"],
      "@routes/*": ["./src/routes/*"],
      "@utils/*": ["./src/utils/*"]
    }
```

Con respecto a los indexes, se recomienda que se cree uno en cualquier directorio que se crea que va a contener varios archivos. Ésto permitirá, a grandes rasgos: imports simplificados, encapsulamiento de los módulos y que el código sea más fácil de mantener.

## Comentarios y JSDocs

Al desarrollar funcionalidades, y sobre todo cuando éstas son bastante complejas, tomarse el tiempo de comentar de forma breve, al estilo de JSDocs (usando `/** */`), la función y sus argumentos. Ej:

```javascript
/**
    Funcionalidad: para qué sirve este método.
    arg1: descripción
    arg2: descripción
    argN: descripción
 */
const estaFunciónEstáCompleja = (arg1, arg2, argN) => {};
```

Para garantizar que un mínimo de documentación se establezca, se ha puesto a disposición una serie de reglas de ESlint que velan por el mínimo indispensable de comentarios JSdoc. Estas reglas se categorizan con la severidad `error` para garantizar que antes de hacer commit se nos recuerde realizar los comentarios necesarios correspondientes.

Una forma de evitar tener que comentar tanto el código es intentar nombrar a los métodos y variables de forma que el nombre de a entenderle a cada dev cuál es su funcionalidad (a ésto se le dice usar nombres **_descriptivos_**). No importa tanto que los nombres se alarguen, lo que importa es que cualquiera que vea el código pueda intuir a primera vista de qué se trata.

## Reglas de ESlint

Buscando la generación de código uniforme a lo largo de todos nuestros proyectos, se establecen una serie de reglas de ESlint que nos sirvan de recordatorio a la hora de desarrollar. Se mencionan aquí algunas que pueden reverse en cada equipo, pero se sugiere el uso por default establecido:

- `@typescript-eslint/array-type`: para establecer una sola forma de declaración del tipo contenido en los arrays. (Para referencia, la [docu oficial sobre esta regla](https://typescript-eslint.io/rules/array-type/))
  - `["error"]` si el equipo prefiere la declaración en la forma `tipo[array]`;
  - Por defecto, se establece que la declaración sea del tipo `Array<tipo>`.
- `react/sort-comp`: para garantizar que el orden de los métodos dentro de cada uno de los componentes sea el mismo dentro de la app y en todas las app a desarrollar. Puede modificarse para las necesidades del equipo siguiendo las indicaciones de la [docu oficial](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md).

# Build and Test

El testing se realiza con Vitest. Con hacer `yarn test` se ejecutan todos los test y queda en watch mode.

# Contribute

TODO: Explain how other users and developers can contribute to make your code better.
