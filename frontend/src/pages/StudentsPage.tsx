import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentsApi } from '../api/students';
import { StudentTable } from '../features/students/StudentTable';
import { DeleteStudentModal } from '../features/students/DeleteStudentModal';
import { Student } from '../types';
import { useToast } from '../context/ToastContext';

export const StudentsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  // State management
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Deletion modal state
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  // TanStack Query
  const { data, isLoading } = useQuery({
    queryKey: ['students', currentPage, pageSize, sortBy, sortDirection, searchKeyword, selectedBranch, selectedYear],
    queryFn: () =>
      studentsApi.getStudents({
        page: currentPage,
        size: pageSize,
        sortBy,
        direction: sortDirection,
        keyword: searchKeyword || undefined,
        branch: selectedBranch || undefined,
        year: selectedYear !== '' ? Number(selectedYear) : undefined,
      }),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => studentsApi.deleteStudent(id),
    onSuccess: () => {
      showToast('Student record deleted successfully', 'success');
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student-stats'] });
      setStudentToDelete(null);
    },
    onError: (err: any) => {
      showToast(err.response?.data?.message || 'Failed to delete student', 'error');
    },
  });

  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchKeyword(val);
    setCurrentPage(0);
  };

  const handleBranchChange = (val: string) => {
    setSelectedBranch(val);
    setCurrentPage(0);
  };

  const handleYearChange = (val: number | '') => {
    setSelectedYear(val);
    setCurrentPage(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Student Directory
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Search, filter, inspect, and manage university enrollment records.
        </p>
      </div>

      <StudentTable
        students={data?.content || []}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={data?.totalPages || 0}
        totalElements={data?.totalElements || 0}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onDeleteClick={(student) => setStudentToDelete(student)}
        searchKeyword={searchKeyword}
        onSearchChange={handleSearchChange}
        selectedBranch={selectedBranch}
        onBranchChange={handleBranchChange}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />

      <DeleteStudentModal
        isOpen={!!studentToDelete}
        onClose={() => setStudentToDelete(null)}
        onConfirm={async () => {
          if (studentToDelete) {
            await deleteMutation.mutateAsync(studentToDelete.id);
          }
        }}
        student={studentToDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

