import { useReducer } from "react";
import { IValidatorType, Validator } from "../validator/Validator";
import { FormContext, IFormData } from "./FormContext";

const initialFormData: IFormData = {};

function reducer(formData: any, { name, formName, type, data }: { formName: string, type: string, data?: any, name?: string }) {
  const form = formData[formName] || {}
  const formField = name ? form[name] : {}
  switch (type) {
    case 'SET_FORM_ERROR':
      return { 
        ...formData, 
        [formName]: { ...form, form: { ...form?.form, errors: [...(form?.form?.errors || []), ...data]} }
      };
    case 'CLEAR_FORM_ERRORS':
      const formFields = Object.keys(form).filter(key => key !== 'form').reduce((acc, key) => ({ ...acc, [key]: { ...form[key], errors: [] }}), {});
      return { 
        ...formData, 
        [formName]: { ...form, ...formFields, form: { ...form?.form, errors: []} }
      };
    case 'CLEAR_FORM_FIELD_ERRORS':
      return { 
        ...formData, 
        [formName]: { ...form, ...(name ? { [name]: { ...formField, errors: [] } }: {}) }
      };
    case 'SET_FORM_FIELD_ERRORS':
      return {
        ...formData, 
        [formName]: { ...form, ...(name ? { [name]: { ...formField, errors: [...(formField?.errors || []), ...(data || [])] } }: {}) }
      };
    case 'TOGGLE_FORM_LOADING':
      return { 
        ...formData, 
        [formName]: { ...form, form: { ...form?.form, loading: data !== undefined ? data : !form?.form?.loading } }
      };  
    case 'SET_FORM_FIELD_DATA':
      return { 
        ...formData, 
        [formName]: { ...form, ...(name ? { [name]: { ...formField, ...data } }: {}) }
      };
    default:
      throw new Error();
  }
}

export const FormProvider = ({ children }: { children: JSX.Element }) => {
  const [formData, dispatch] = useReducer(reducer, initialFormData);

  const getForm = (formName: string) => (formData[formName] || {});
  const setFormError = (formName: string, error: string ) => dispatch({ type: 'SET_FORM_ERROR', formName, data: [error] });
  const toggleFormLoading = (formName: string, forceLoading?: boolean) => dispatch({ type: 'TOGGLE_FORM_LOADING', formName, data: forceLoading });
  const setFormFieldError = (formName: string, name: string, error: string ) => dispatch({ type: 'SET_FORM_FIELD_ERRORS', formName, name, data: [error] });
  const clearFormErrors = (formName: string ) => dispatch({ type: 'CLEAR_FORM_ERRORS', formName });
  const clearFormFieldErrors = (formName: string, name: string) => dispatch({ type: 'CLEAR_FORM_FIELD_ERRORS', formName, name });
  

  const setFormFieldValue = (formName: string, name: string, value: string | number, validation?: IValidatorType) => {
    dispatch({ type: 'SET_FORM_FIELD_DATA', formName, name, data: { value } });
    if(validation) { 
      const validator = new Validator(validation, value)
      const isValid = validator.validate()
      if(!isValid){
        setFormFieldError(formName, name, 'Required')
      } else {
        clearFormFieldErrors(formName, name)
      }
    }
  }

  return (
    <FormContext.Provider value={{ 
      formData, 
      setFormFieldValue, 
      toggleFormLoading,
      setFormFieldError, 
      clearFormErrors,
      setFormError,
      getForm,
    }} >
      {children}
    </FormContext.Provider>
  )
}