import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { studentsApi } from '../api/students';
import { StudentForm } from '../features/students/StudentForm';
import { StudentFormData } from '../types';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export const AddStudentPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const createMutation = useMutation({
    mutationFn: (data: StudentFormData) => studentsApi.createStudent(data),
    onSuccess: (created) => {
      showToast(`Student ${created.name} registered successfully!`, 'success');
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student-stats'] });
      navigate('/students');
    },
    onError: (err: any) => {
      const response = err.response?.data;
      if (response?.fieldErrors) {
        setServerErrors(response.fieldErrors);
        showToast('Please correct the validation errors in the form.', 'error');
      } else {
        showToast(response?.message || 'Failed to create student profile', 'error');
      }
    },
  });

  const handleSubmit = async (data: StudentFormData) => {
    setServerErrors({});
    await createMutation.mutateAsync(data);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/students')}
        >
          Back to Directory
        </Button>
      </div>

      <div className="text-center space-y-1">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 mx-auto flex items-center justify-center">
          <UserPlus className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Enroll New Student
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter validated student details to add a new profile to the institutional database.
        </p>
      </div>

      <StudentForm
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending}
        onCancel={() => navigate('/students')}
        serverErrors={serverErrors}
      />
    </div>
  );
};

