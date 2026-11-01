import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Pencil } from 'lucide-react';
import { studentsApi } from '../api/students';
import { StudentForm } from '../features/students/StudentForm';
import { StudentFormData } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { useToast } from '../context/ToastContext';

export const EditStudentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const studentId = Number(id);

  const { data: student, isLoading: isFetching } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentsApi.getStudentById(studentId),
    enabled: !!studentId,
  });

  const updateMutation = useMutation({
    mutationFn: (data: StudentFormData) => studentsApi.updateStudent(studentId, data),
    onSuccess: (updated) => {
      showToast(`Student ${updated.name} updated successfully!`, 'success');
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student', studentId] });
      queryClient.invalidateQueries({ queryKey: ['student-stats'] });
      navigate(`/students/${studentId}`);
    },
    onError: (err: any) => {
      const response = err.response?.data;
      if (response?.fieldErrors) {
        setServerErrors(response.fieldErrors);
        showToast('Please correct the validation errors in the form.', 'error');
      } else {
        showToast(response?.message || 'Failed to update student profile', 'error');
      }
    },
  });

  const handleSubmit = async (data: StudentFormData) => {
    setServerErrors({});
    await updateMutation.mutateAsync(data);
  };

  if (isFetching) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  if (!student) {
    return (
      <Card className="max-w-md mx-auto text-center p-8">
        <p className="text-rose-500 font-bold">Student not found</p>
        <Button variant="outline" size="sm" onClick={() => navigate('/students')} className="mt-4">
          Back to Directory
        </Button>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate(`/students/${studentId}`)}
        >
          Cancel & Return
        </Button>
      </div>

      <div className="text-center space-y-1">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 mx-auto flex items-center justify-center">
          <Pencil className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Edit Student Record
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Updating profile for <span className="font-semibold text-slate-800 dark:text-slate-200">{student.name}</span> ({student.enrollmentNumber})
        </p>
      </div>

      <StudentForm
        initialData={student}
        onSubmit={handleSubmit}
        isLoading={updateMutation.isPending}
        onCancel={() => navigate(`/students/${studentId}`)}
        serverErrors={serverErrors}
      />
    </div>
  );
};
