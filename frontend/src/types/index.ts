export type UserRole = 'ROLE_ADMIN' | 'ROLE_STAFF';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface Student {
  id: number;
  enrollmentNumber: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudentFormData {
  enrollmentNumber: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  year: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface StudentStats {
  totalStudents: number;
  studentsByBranch: Record<string, number>;
  studentsByYear: Record<number, number>;
  recentlyAdded: Student[];
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  fieldErrors?: Record<string, string>;
}

