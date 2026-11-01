import { apiClient } from './client';
import { PageResponse, Student, StudentFormData } from '../types';

export interface StudentQueryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: 'asc' | 'desc';
  keyword?: string;
  branch?: string;
  year?: number;
}

export const studentsApi = {
  getStudents: async (params: StudentQueryParams = {}): Promise<PageResponse<Student>> => {
    const response = await apiClient.get<PageResponse<Student>>('/students', {
      params: {
        page: params.page ?? 0,
        size: params.size ?? 10,
        sortBy: params.sortBy ?? 'id',
        direction: params.direction ?? 'asc',
        keyword: params.keyword || undefined,
        branch: params.branch || undefined,
        year: params.year || undefined,
      },
    });
    return response.data;
  },

  getStudentById: async (id: number): Promise<Student> => {
    const response = await apiClient.get<Student>(`/students/${id}`);
    return response.data;
  },

  createStudent: async (studentData: StudentFormData): Promise<Student> => {
    const response = await apiClient.post<Student>('/students', studentData);
    return response.data;
  },

  updateStudent: async (id: number, studentData: StudentFormData): Promise<Student> => {
    const response = await apiClient.put<Student>(`/students/${id}`, studentData);
    return response.data;
  },

  deleteStudent: async (id: number): Promise<void> => {
    await apiClient.delete(`/students/${id}`);
  },
};

