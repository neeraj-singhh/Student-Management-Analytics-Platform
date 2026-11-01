import React from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { AlertTriangle } from 'lucide-react';
import { Student } from '../../types';

interface DeleteStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  student: Student | null;
  isLoading?: boolean;
}

export const DeleteStudentModal: React.FC<DeleteStudentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  student,
  isLoading = false,
}) => {
  if (!student) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Student Record"
      maxWidth="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            Confirm Delete
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Are you sure you want to permanently remove{' '}
            <span className="font-bold text-slate-900 dark:text-white">
              {student.name}
            </span>{' '}
            (<span className="font-mono text-xs">{student.enrollmentNumber}</span>)?
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            This action cannot be undone. All database records associated with this student will be deleted.
          </p>
        </div>
      </div>
    </Modal>
  );
};
