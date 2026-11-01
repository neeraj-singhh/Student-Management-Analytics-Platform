import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  Pencil, 
  Trash2, 
  Search, 
  Filter, 
  ArrowUpDown, 
  GraduationCap,
  Plus
} from 'lucide-react';
import { Student } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { Pagination } from '../../components/ui/Pagination';
import { formatDate, getBranchBadgeColor, getYearLabel } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onDeleteClick: (student: Student) => void;
  searchKeyword: string;
  onSearchChange: (keyword: string) => void;
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
  selectedYear: number | '';
  onYearChange: (year: number | '') => void;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (sortBy: string) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  isLoading,
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
  onDeleteClick,
  searchKeyword,
  onSearchChange,
  selectedBranch,
  onBranchChange,
  selectedYear,
  onYearChange,
  sortBy,
  sortDirection,
  onSortChange,
}) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const branches = [
    'All Branches',
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Mechanical',
    'Civil',
  ];

  const years = [
    { label: 'All Years', value: '' },
    { label: '1st Year', value: 1 },
    { label: '2nd Year', value: 2 },
    { label: '3rd Year', value: 3 },
    { label: '4th Year', value: 4 },
  ];

  const clearFilters = () => {
    onSearchChange('');
    onBranchChange('');
    onYearChange('');
  };

  const hasActiveFilters = !!searchKeyword || !!selectedBranch || selectedYear !== '';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, enrollment ID, or email..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all"
          />
        </div>

        {/* Filter Controls & Add Action */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Branch Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-2.5 py-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedBranch}
              onChange={(e) => onBranchChange(e.target.value === 'All Branches' ? '' : e.target.value)}
              className="bg-transparent text-xs text-slate-700 dark:text-slate-200 font-medium focus:outline-none py-1"
            >
              {branches.map((b) => (
                <option key={b} value={b} className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-2.5 py-1">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value === '' ? '' : Number(e.target.value))}
              className="bg-transparent text-xs text-slate-700 dark:text-slate-200 font-medium focus:outline-none py-1"
            >
              {years.map((y) => (
                <option key={y.label} value={y.value} className="dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                  {y.label}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-slate-500">
              Clear Filters
            </Button>
          )}

          {isAdmin && (
            <Button
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => navigate('/students/new')}
            >
              Add Student
            </Button>
          )}
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 dark:bg-slate-800/40 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-800">
              <th className="py-3.5 px-4 sm:px-6">Enrollment ID</th>
              <th 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 select-none"
                onClick={() => onSortChange('name')}
              >
                <div className="flex items-center gap-1">
                  <span>Student Name</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3.5 px-4">Contact Info</th>
              <th className="py-3.5 px-4">Branch / Department</th>
              <th className="py-3.5 px-4">Academic Year</th>
              <th 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200 select-none"
                onClick={() => onSortChange('createdAt')}
              >
                <div className="flex items-center gap-1">
                  <span>Enrolled On</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm">
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="py-4 px-4 sm:px-6"><Skeleton className="h-4 w-20" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-4 w-32" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-4 w-40" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-5 w-24 rounded-full" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-4 w-16" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="py-4 px-4 sm:px-6 text-right"><Skeleton className="h-7 w-20 ml-auto rounded-lg" /></td>
                </tr>
              ))
            ) : students.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={7} className="py-12 text-center">
                  <div className="max-w-xs mx-auto space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      No students found
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {hasActiveFilters
                        ? 'Try adjusting your search keywords or branch/year filters.'
                        : 'No student profiles have been added to the system yet.'}
                    </p>
                    {hasActiveFilters && (
                      <Button variant="outline" size="sm" onClick={clearFilters}>
                        Reset Filters
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              // Active Data Rows
              students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                >
                  {/* Enrollment ID */}
                  <td className="py-3.5 px-4 sm:px-6 font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
                    {student.enrollmentNumber}
                  </td>

                  {/* Student Name */}
                  <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {student.name}
                  </td>

                  {/* Contact Info */}
                  <td className="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400">
                    <div>{student.email}</div>
                    <div className="text-[11px] text-slate-400">{student.phone}</div>
                  </td>

                  {/* Branch Badge */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBranchBadgeColor(
                        student.branch
                      )}`}
                    >
                      {student.branch}
                    </span>
                  </td>

                  {/* Academic Year */}
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-700 dark:text-slate-300">
                    {getYearLabel(student.year)}
                  </td>

                  {/* Date Created */}
                  <td className="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {formatDate(student.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigate(`/students/${student.id}`)}
                        className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/50 rounded-lg transition-colors"
                        title="View profile details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {isAdmin && (
                        <>
                          <button
                            onClick={() => navigate(`/students/${student.id}/edit`)}
                            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 rounded-lg transition-colors"
                            title="Edit student"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onDeleteClick(student)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                            title="Delete student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 sm:p-5">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={totalElements}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
