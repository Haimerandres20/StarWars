import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, type = 'text', required = false, textarea = false }) => (
  <div className="input-field-group">
    <label htmlFor={name}>{label}</label>
    {textarea ? (
      <textarea
        id={name}
        name={name}
        value={value as string}
        onChange={onChange}
        required={required}
      />
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    )}
  </div>
);

export default InputField;
