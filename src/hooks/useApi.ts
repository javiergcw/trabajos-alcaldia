import { useState, useCallback } from 'react';
import { ApiResponse } from '../types';
import { apiClient } from '../services/api/apiClient';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

export function useApi<T>(
  apiCall: (...args: any[]) => Promise<ApiResponse<T>>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await apiCall(...args);
        setState(prev => ({ ...prev, data: response.data, loading: false }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'An error occurred',
          loading: false,
        }));
      }
    },
    [apiCall]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook específico para operaciones CRUD
export function useCrudApi<T>(
  endpoint: string
): {
  get: (id?: string) => Promise<void>;
  getAll: (params?: Record<string, string>) => Promise<void>;
  create: (data: Partial<T>) => Promise<void>;
  update: (id: string, data: Partial<T>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  data: T | T[] | null;
  loading: boolean;
  error: string | null;
} {
  const [state, setState] = useState<UseApiState<T | T[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const get = useCallback(async (id?: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiClient.get<T>(id ? `${endpoint}/${id}` : endpoint);
      setState(prev => ({ ...prev, data: response.data, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  }, [endpoint]);

  const getAll = useCallback(async (params?: Record<string, string>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await apiClient.get<T[]>(endpoint, params);
      setState(prev => ({ ...prev, data: response.data, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  }, [endpoint]);

  const create = useCallback(async (data: Partial<T>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await apiClient.post<T>(endpoint, data);
      // Recargar la lista después de crear
      await getAll();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  }, [endpoint, getAll]);

  const update = useCallback(async (id: string, data: Partial<T>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await apiClient.put<T>(`${endpoint}/${id}`, data);
      // Recargar la lista después de actualizar
      await getAll();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  }, [endpoint, getAll]);

  const remove = useCallback(async (id: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await apiClient.delete(`${endpoint}/${id}`);
      // Recargar la lista después de eliminar
      await getAll();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  }, [endpoint, getAll]);

  return {
    get,
    getAll,
    create,
    update,
    remove,
    ...state,
  };
}
