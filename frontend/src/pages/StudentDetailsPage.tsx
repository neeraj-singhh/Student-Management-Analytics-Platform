import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Pencil, 
  Trash2, 
  Mail, 
  Phone, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Hash, 
  Clock,
  ShieldCheck 
} from 'lucide-react';
import { studentsApi } from '../api/students';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { DeleteStudentModal } from '../features/students/DeleteStudentModal';
import { formatDate, formatDateTime, getBranchBadgeColor, getYearLabel } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const StudentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const studentId = Number(id);

  const { data: student, isLoading, error } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentsApi.getStudentById(studentId),
    enabled: !!studentId,
  });

  const deleteMutation = useMutation({
    mutationFn: () => studentsApi.deleteStudent(studentId),
    onSuccess: () => {
      showToast('Student deleted successfully', 'success');
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student-stats'] });
      navigate('/students');
    },
    onError: (err: any) => {
      showToast(err.response?.data?.message || 'Failed to delete student', 'error');
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (error || !student) {
    return (
      <Card className="max-w-md mx-auto text-center p-8">
        <p className="text-rose-500 font-bold">Student profile not found</p>
        <p className="text-xs text-slate-500 mt-1">The student ID might be invalid or deleted.</p>
        <Button variant="outline" size="sm" onClick={() => navigate('/students')} className="mt-4">
          Back to Directory
        </Button>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/students')}
        >
          Back to Directory
        </Button>

        {isAdmin && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Pencil className="w-4 h-4" />}
              onClick={() => navigate(`/students/${student.id}/edit`)}
            >
              Edit Profile
            </Button>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Main Profile Card */}
      <Card className="p-8">
        {/* Header Profile Identity */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-brand-500/20">
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                  {student.name}
                </h3>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBranchBadgeColor(student.branch)}`}>
                  {student.branch}
                </span>
              </div>
              <p className="text-xs font-mono font-semibold text-slate-400 mt-0.5">
                Enrollment ID: {student.enrollmentNumber}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
              Academic Standing
            </span>
            <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
              {getYearLabel(student.year)}
            </span>
          </div>
        </div>

        {/* Detailed Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Email Address</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{student.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Contact Phone</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{student.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Department / Major</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{student.branch}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Curriculum Year</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{student.year} of 4</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Registration Date</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{formatDate(student.createdAt)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Last Record Update</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{formatDateTime(student.updatedAt)}</p>
            </div>
          </div>
        </div>
      </Card>

      <DeleteStudentModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => {
          await deleteMutation.mutateAsync();
        }}
        student={student}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

