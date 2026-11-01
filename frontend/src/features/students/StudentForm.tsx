import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { StudentFormData } from '../../types';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Hash, User, Mail, Phone, BookOpen, Calendar, Save } from 'lucide-react';

const studentSchema = z.object({
  enrollmentNumber: z
    .string()
    .min(4, 'Enrollment number must be at least 4 characters')
    .max(50, 'Enrollment number cannot exceed 50 characters'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[+0-9\-\s()]{10,20}$/, 'Phone must be a valid contact number (10–20 digits)'),
  branch: z
    .string()
    .min(2, 'Branch is required')
    .max(50, 'Branch cannot exceed 50 characters'),
  year: z.coerce
    .number()
    .min(1, 'Year must be between 1 and 5')
    .max(5, 'Year must be between 1 and 5'),
});

interface StudentFormProps {
  initialData?: Partial<StudentFormData>;
  onSubmit: (data: StudentFormData) => Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
  serverErrors?: Record<string, string>;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  onCancel,
  serverErrors = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      enrollmentNumber: initialData?.enrollmentNumber || '',
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      branch: initialData?.branch || 'Computer Science',
      year: initialData?.year || 1,
    },
  });

  const branchOptions = [
    { label: 'Computer Science', value: 'Computer Science' },
    { label: 'Information Technology', value: 'Information Technology' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Mechanical', value: 'Mechanical' },
    { label: 'Civil', value: 'Civil' },
  ];

  const yearOptions = [
    { label: '1st Year (Freshman)', value: 1 },
    { label: '2nd Year (Sophomore)', value: 2 },
    { label: '3rd Year (Junior)', value: 3 },
    { label: '4th Year (Senior)', value: 4 },
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Enrollment Number */}
          <Input
            label="Enrollment ID"
            placeholder="e.g. EN2024101"
            leftIcon={<Hash className="w-4 h-4" />}
            error={errors.enrollmentNumber?.message || serverErrors.enrollmentNumber}
            {...register('enrollmentNumber')}
          />

          {/* Full Name */}
          <Input
            label="Full Name"
            placeholder="e.g. Aarav Sharma"
            leftIcon={<User className="w-4 h-4" />}
            error={errors.name?.message || serverErrors.name}
            {...register('name')}
          />

          {/* Email Address */}
          <Input
            label="Official Email"
            type="email"
            placeholder="e.g. student@university.edu"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message || serverErrors.email}
            {...register('email')}
          />

          {/* Phone Number */}
          <Input
            label="Contact Phone"
            placeholder="e.g. +91 9876543210"
            leftIcon={<Phone className="w-4 h-4" />}
            error={errors.phone?.message || serverErrors.phone}
            {...register('phone')}
          />

          {/* Branch / Department */}
          <Select
            label="Branch / Department"
            options={branchOptions}
            error={errors.branch?.message || serverErrors.branch}
            {...register('branch')}
          />

          {/* Academic Year */}
          <Select
            label="Academic Year"
            options={yearOptions}
            error={errors.year?.message || serverErrors.year}
            {...register('year')}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            isLoading={isLoading}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Student Profile
          </Button>
        </div>
      </form>
    </Card>
  );
};

