import axios from 'axios';
import { IEstate } from '../types';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic API
const api = async <T>(
  endpoint: string,
  method: 'get' | 'post' | 'put' | 'delete' = 'get',
  params: Record<string, string | null> = {}
): Promise<T> => {
  try {
    const response = await instance.request<T>({
      url: endpoint,
      method,
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при запросе к серверу');
  }
};

// Get estates
export const getEstates = async (
  params: { city?: string | null; search?: string | null } = {}
): Promise<IEstate[]> => {
  return api<IEstate[]>('/estates', 'get', params);
};
