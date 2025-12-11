import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface FileUploadProps {
  id: string;
  label: string;
  onFileChange: (file: File | null) => void;
  currentFileUrl?: string; // For displaying existing file
  error?: string;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  onFileChange,
  currentFileUrl,
  error,
  accept = 'image/*',
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentFileUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onFileChange(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input value
    }
    setPreviewUrl(null);
    onFileChange(null);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <input
          id={id}
          name={id}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {previewUrl && (
          <button
            type="button"
            onClick={handleClearFile}
            className="px-3 py-1.5 text-sm font-semibold text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition duration-200"
            title={t('common.clear_file')}
          >
            {t('common.clear_file')}
          </button>
        )}
      </div>
      {previewUrl && (
        <div className="mt-2 w-32 h-32 overflow-hidden rounded-md border border-gray-300">
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload;