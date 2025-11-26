# Playground Complex Components

Proyecto de demostración con componentes complejos en React + TypeScript + Vite, que incluye:
- 📊 **DataTable**: Tabla con paginación, filtros y exportación
- ♾️ **Infinity Scroll**: Lista infinita con búsqueda y filtros
- 📝 **Form Builder**: Formulario dinámico con validaciones usando react-hook-form y Zod
- 🔢 **Multistep Form**: Formulario de múltiples pasos

## 🚀 Cómo ejecutar el proyecto

### Prerequisitos

- Node.js 18+ instalado
- pnpm, npm o yarn

### Instalación

1. **Clonar el repositorio** (si aplica):
```bash
git clone <url-del-repositorio>
cd playground-complex-components
```

2. **Instalar dependencias**:

Con **pnpm** (recomendado):
```bash
pnpm install
```

Con **npm**:
```bash
npm install
```

Con **yarn**:
```bash
yarn install
```

### Ejecutar en desarrollo

Con **pnpm**:
```bash
pnpm dev
```

Con **npm**:
```bash
npm run dev
```

Con **yarn**:
```bash
yarn dev
```

El proyecto se abrirá en [http://localhost:5173](http://localhost:5173)

### Otros comandos

```bash
# Compilar para producción
pnpm build

# Previsualizar build de producción
pnpm preview

# Ejecutar linter
pnpm lint
```

## 📁 Estructura del proyecto

```
src/
├── pages/              # Páginas/vistas principales
│   ├── DataTableScreen/
│   ├── FormBuilderScreen/
│   ├── InfinityScrollScreen/
│   └── MultistepScreen/
├── shared/             # Componentes compartidos
│   ├── components/     # Componentes reutilizables
│   └── layouts/        # Layouts de la aplicación
├── data/              # Datos estáticos (JSON)
├── store/             # Estado global (Zustand)
├── types/             # Definiciones de tipos TypeScript
└── utils/             # Funciones utilitarias
```

## 🛠️ Tecnologías utilizadas

- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Enrutamiento
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Zustand** - Estado global
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos
- **React Toastify** - Notificaciones

## ⚙️ Configuración adicional

### React Compiler

El React Compiler no está habilitado en este proyecto debido a su impacto en el rendimiento de desarrollo y build. Para agregarlo, consulta [esta documentación](https://react.dev/learn/react-compiler/installation).

### Expandir la configuración de ESLint

Si estás desarrollando una aplicación para producción, se recomienda actualizar la configuración para habilitar reglas de lint con type-awareness:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

También puedes instalar [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) y [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para reglas de lint específicas de React:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
