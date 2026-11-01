import { apiClient } from './client';
import { StudentStats } from '../types';

export const analyticsApi = {
  getStudentStats: async (): Promise<StudentStats> => {
    const response = await apiClient.get<StudentStats>('/analytics/stats');
    return response.data;
  },
};
