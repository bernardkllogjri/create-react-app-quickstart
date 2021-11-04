import { useContext } from "react";
import { FormContext } from "../FormContext";
import './FormError.css';

export const FormErrors = ({ formName, field } : { formName: string, field?: string }) => {
  const { formData } = useContext(FormContext);
  let resultDOM;
  if(field){
    resultDOM =  formData[formName] && formData[formName][field]?.errors?.map((err, index) => (
      <div key={index}>{err}</div>
    ));
  } else {
    resultDOM = formData[formName]?.form?.errors && formData[formName]?.form?.errors?.map((err, index) => (
      <div key={index}>{err}</div>
    ));
  }
  return resultDOM && resultDOM.length ? <div className='FormError-container'>{resultDOM}</div> : null;
}