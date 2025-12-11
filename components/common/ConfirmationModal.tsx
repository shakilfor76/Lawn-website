import React from 'react';
import Button from './Button';
import { useLanguage } from '../../context/LanguageContext';

interface ConfirmationModalProps {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  confirmVariant = 'primary',
}) => {
  const { t } = useLanguage();

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 relative text-center">
        <h3 id="confirmation-modal-title" className="text-xl font-bold mb-4 text-gray-800">
          {title}
        </h3>
        <p id="confirmation-modal-description" className="text-gray-700 mb-6">
          {message}
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={onCancel} variant="secondary" size="sm">
            {cancelText || t('confirm_modal.button.cancel')}
          </Button>
          <Button onClick={onConfirm} variant={confirmVariant} size="sm">
            {confirmText || t('confirm_modal.button.confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
