// Estados de trabajo
export const WORK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ON_HOLD: 'on_hold',
} as const;

export const WORK_STATUS_LABELS = {
  [WORK_STATUS.PENDING]: 'Pendiente',
  [WORK_STATUS.IN_PROGRESS]: 'En Progreso',
  [WORK_STATUS.COMPLETED]: 'Completado',
  [WORK_STATUS.CANCELLED]: 'Cancelado',
  [WORK_STATUS.ON_HOLD]: 'En Espera',
} as const;

export const WORK_STATUS_COLORS = {
  [WORK_STATUS.PENDING]: 'warning',
  [WORK_STATUS.IN_PROGRESS]: 'info',
  [WORK_STATUS.COMPLETED]: 'success',
  [WORK_STATUS.CANCELLED]: 'error',
  [WORK_STATUS.ON_HOLD]: 'default',
} as const;

// Tipos de trabajo
export const WORK_TYPES = {
  MAINTENANCE: 'maintenance',
  REPAIR: 'repair',
  CLEANING: 'cleaning',
  CONSTRUCTION: 'construction',
  INSPECTION: 'inspection',
} as const;

export const WORK_TYPE_LABELS = {
  [WORK_TYPES.MAINTENANCE]: 'Mantenimiento',
  [WORK_TYPES.REPAIR]: 'Reparación',
  [WORK_TYPES.CLEANING]: 'Limpieza',
  [WORK_TYPES.CONSTRUCTION]: 'Construcción',
  [WORK_TYPES.INSPECTION]: 'Inspección',
} as const;

// Prioridades
export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export const PRIORITY_LABELS = {
  [PRIORITIES.LOW]: 'Baja',
  [PRIORITIES.MEDIUM]: 'Media',
  [PRIORITIES.HIGH]: 'Alta',
  [PRIORITIES.URGENT]: 'Urgente',
} as const;

export const PRIORITY_COLORS = {
  [PRIORITIES.LOW]: 'success',
  [PRIORITIES.MEDIUM]: 'info',
  [PRIORITIES.HIGH]: 'warning',
  [PRIORITIES.URGENT]: 'error',
} as const;

// Roles de usuario
export const USER_ROLES = {
  ADMIN: 'admin',
  SUPERVISOR: 'supervisor',
  WORKER: 'worker',
  VIEWER: 'viewer',
} as const;

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.SUPERVISOR]: 'Supervisor',
  [USER_ROLES.WORKER]: 'Trabajador',
  [USER_ROLES.VIEWER]: 'Visualizador',
} as const;

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50],
} as const;

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  WORKS: '/works',
  USERS: '/users',
  REPORTS: '/reports',
  SETTINGS: '/settings',
} as const;

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor, verifica tu conexión a internet.',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
  NOT_FOUND: 'El recurso solicitado no fue encontrado.',
  VALIDATION_ERROR: 'Por favor, verifica los datos ingresados.',
  SERVER_ERROR: 'Error del servidor. Por favor, intenta más tarde.',
} as const;

// Mensajes de éxito comunes
export const SUCCESS_MESSAGES = {
  CREATED: 'Registro creado exitosamente.',
  UPDATED: 'Registro actualizado exitosamente.',
  DELETED: 'Registro eliminado exitosamente.',
  SAVED: 'Cambios guardados exitosamente.',
} as const;
