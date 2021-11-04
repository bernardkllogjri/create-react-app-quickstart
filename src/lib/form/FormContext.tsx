import React from 'react';
import { IValidatorType } from '../validator/Validator';

export type IFormData = {
  [x: string]: {
    [y: string]: { 
      value?: string | number,
      errors?: string[],
      loading?: boolean,
    },
    form: {
      errors?: string[],
      loading?: boolean,
    }
  },
};

export type IForm = {
  formData: IFormData,
  clearFormErrors: (formName: string) => any,
  getForm: (formName: string) => any,
  setFormError: (formName: string, error: string) => any,
  toggleFormLoading: (formName: string, forceLoading?: boolean) => any,
  setFormFieldValue: (formName: string, name: string, value: string, validation?: IValidatorType) => any,
  setFormFieldError: (formName: string, name: string, value: string) => any,
} | null;

export const initialFormData: IForm = {
  formData: {},
  getForm: () => {},
  setFormError: () => {},
  clearFormErrors: () => {},
  setFormFieldValue: () => {},
  setFormFieldError: () => {},
  toggleFormLoading: () => {},
};

export const FormContext = React.createContext(initialFormData);