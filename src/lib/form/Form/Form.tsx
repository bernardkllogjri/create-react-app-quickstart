import { FormEvent, ReactNodeArray, useContext } from 'react'
import { Control } from './Control'
import { FormContext } from '../FormContext'
import { TextInput } from './TextInput'

const Form = ({ name, children, onSubmit }: { name: string, children: ReactNodeArray, onSubmit?: Function }) => {
  const form = useContext(FormContext)
  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    const formFields = form.formData[name]
    event.preventDefault();
    onSubmit && onSubmit(formFields, form || {});
    form.clearFormErrors(name)
    // Object.keys(formFields).forEach(field => {
    //   const validator = new Validator(, formFields[field].value)
    // })
  }
  return (
    <form name={name} onSubmit={onSubmitHandler}>{children}</form>
  )
}

Form.TextInput = TextInput
Form.Control = Control

export { Form }