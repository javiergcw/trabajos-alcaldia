// Tipos base para el proyecto
export interface BaseEntity {
  id: string | number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  errors?: string[];
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
