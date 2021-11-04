import { useContext } from 'react';
import { IValidatorType } from '../../validator/Validator';
import { FormContext } from '../FormContext';

export type ITextInputProps = { name: string, className?: string, placeholder?: string, type?: string, validation?: IValidatorType }

export const TextInput = ({ name, className, placeholder, type, validation } : ITextInputProps) => {
  const { setFormFieldValue } = useContext(FormContext);
  return (
    <input
      className={className}
      placeholder={placeholder}
      name={name}
      type={type}
      onChange={(e) => { setFormFieldValue(e.target.form?.name || '', name, e.target.value, validation); }}
    />
  );
}