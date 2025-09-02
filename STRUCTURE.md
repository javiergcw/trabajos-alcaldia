# Estructura del Proyecto - Trabajos Alcaldía

Este proyecto está estructurado siguiendo el patrón arquitectónico **MVC (Model-View-Controller)** con Next.js y Material-UI.

## 📁 Estructura de Carpetas

```
src/
├── app/                    # Next.js App Router
├── models/                 # Modelos de datos (M del MVC)
├── views/                  # Vistas y componentes (V del MVC)
│   ├── components/         # Componentes reutilizables
│   ├── layouts/            # Layouts de la aplicación
│   └── pages/              # Páginas principales
├── controllers/            # Controladores (C del MVC)
├── services/               # Servicios y lógica de negocio
│   ├── api/               # Cliente HTTP y llamadas a API
│   └── localStorage/      # Servicios de almacenamiento local
├── utils/                  # Utilidades y funciones auxiliares
│   ├── validation/        # Funciones de validación
│   ├── formatting/         # Funciones de formateo
│   └── helpers/           # Funciones auxiliares
├── types/                  # Definiciones de tipos TypeScript
├── constants/              # Constantes del proyecto
├── hooks/                  # Hooks personalizados de React
├── contexts/               # Contextos de React
└── styles/                 # Estilos y temas
    ├── themes/             # Temas de Material-UI
    └── components/         # Estilos específicos de componentes
```

## 🏗️ Arquitectura MVC

### **Models** (`/src/models/`)
- **Propósito**: Definir la estructura de datos y la lógica de negocio
- **Contiene**: Interfaces, tipos, y clases que representan entidades del sistema
- **Ejemplo**: `Work.ts`, `User.ts`, `Report.ts`

### **Views** (`/src/views/`)
- **Propósito**: Presentar la interfaz de usuario
- **Contiene**: Componentes React, páginas y layouts
- **Subcarpetas**:
  - `components/`: Componentes reutilizables (botones, formularios, tablas)
  - `pages/`: Páginas principales de la aplicación
  - `layouts/`: Layouts que envuelven las páginas

### **Controllers** (`/src/controllers/`)
- **Propósito**: Manejar la lógica de control y coordinación
- **Contiene**: Funciones que conectan modelos con vistas
- **Ejemplo**: `WorkController.ts`, `UserController.ts`

## 🔧 Servicios y Utilidades

### **Services** (`/src/services/`)
- **API Client**: Cliente HTTP para comunicaciones con backend
- **Local Storage**: Servicios para persistencia local
- **Business Logic**: Lógica de negocio específica

### **Utils** (`/src/utils/`)
- **Validation**: Funciones de validación de formularios
- **Formatting**: Funciones de formateo de datos
- **Helpers**: Funciones auxiliares comunes

### **Hooks** (`/src/hooks/`)
- **useApi**: Hook para manejo de llamadas a API
- **useCrudApi**: Hook para operaciones CRUD
- **Hooks personalizados**: Para lógica específica del proyecto

## 🎨 Material-UI y Temas

### **Tema Personalizado**
- Archivo: `src/styles/themes/theme.ts`
- Configuración de colores, tipografía y componentes
- Personalización de estilos globales

### **Componentes**
- Uso de componentes Material-UI para consistencia visual
- Sistema de diseño unificado
- Responsive design integrado

## 📱 Páginas y Navegación

### **Rutas Principales**
- `/` - Página de inicio
- `/dashboard` - Dashboard principal
- `/works` - Gestión de trabajos
- `/users` - Gestión de usuarios
- `/reports` - Reportes y estadísticas
- `/settings` - Configuración

### **Layout Principal**
- Sidebar de navegación
- Header con título y acciones
- Contenido principal responsive
- Navegación móvil optimizada

## 🚀 Cómo Usar

### **1. Crear un Nuevo Modelo**
```typescript
// src/models/Work.ts
export interface Work extends BaseEntity {
  title: string;
  description: string;
  status: WorkStatus;
  priority: Priority;
  assignedTo: string;
  dueDate: Date;
}
```

### **2. Crear un Nuevo Servicio**
```typescript
// src/services/WorkService.ts
export class WorkService {
  async getAll(): Promise<Work[]> {
    return apiClient.get<Work[]>('/works');
  }
  
  async create(work: Partial<Work>): Promise<Work> {
    return apiClient.post<Work>('/works', work);
  }
}
```

### **3. Crear un Nuevo Controlador**
```typescript
// src/controllers/WorkController.ts
export class WorkController {
  constructor(private workService: WorkService) {}
  
  async handleCreateWork(workData: Partial<Work>): Promise<Work> {
    // Validación
    // Lógica de negocio
    return this.workService.create(workData);
  }
}
```

### **4. Crear una Nueva Vista**
```typescript
// src/views/pages/Works.tsx
export default function WorksPage() {
  const { data, loading, error, getAll } = useCrudApi<Work>('/works');
  
  useEffect(() => {
    getAll();
  }, [getAll]);
  
  return (
    <MainLayout>
      {/* Contenido de la página */}
    </MainLayout>
  );
}
```

## 📋 Convenciones de Nomenclatura

- **Archivos**: PascalCase para componentes, camelCase para utilidades
- **Carpetas**: camelCase
- **Componentes**: PascalCase
- **Hooks**: camelCase con prefijo `use`
- **Servicios**: PascalCase con sufijo `Service`
- **Controladores**: PascalCase con sufijo `Controller`

## 🔒 Seguridad y Validación

- Validación de formularios con funciones utilitarias
- Manejo de errores centralizado
- Tipos TypeScript para seguridad de tipos
- Validación de datos de entrada

## 📱 Responsive Design

- Diseño mobile-first
- Breakpoints de Material-UI
- Layouts adaptativos
- Navegación móvil optimizada

## 🚀 Próximos Pasos

1. **Implementar autenticación** con JWT
2. **Agregar estado global** con Context API o Redux
3. **Implementar testing** con Jest y React Testing Library
4. **Agregar documentación** con Storybook
5. **Implementar PWA** con service workers
6. **Agregar internacionalización** (i18n)

## 📚 Dependencias Principales

- **Next.js**: Framework de React
- **Material-UI**: Componentes de UI
- **TypeScript**: Tipado estático
- **Emotion**: CSS-in-JS para Material-UI
- **React Hooks**: Estado y efectos

---

**Nota**: Esta estructura está diseñada para ser escalable y mantenible. Ajusta según las necesidades específicas de tu proyecto.
