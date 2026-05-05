import { useState, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';

export const useAppForm = <T extends object>(
  initialValues: T,
  onSubmit: (data: T) => void,
  validate?: (data: T) => Record<string, string>
) => {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validate) {
      const errors = validate(formData);
      const errorMessages = Object.values(errors);

      if (errorMessages.length > 0) {
        errorMessages.forEach((msg) => toast.error(msg));
        return;
      }
    }

    onSubmit(formData);
  };

  return { formData, handleChange, handleSubmit, setFormData };
};