import './Input.css'
import { Form } from "../../../lib/form"
import { ITextInputProps } from '../../../lib/form/Form/TextInput'

export const Input = ({ name, controlled, placeholder, type, validation }: ITextInputProps & { controlled: boolean }) => {
  return controlled ? (
    <Form.TextInput
      className='Input'
      placeholder={placeholder}
      validation={validation}
      name={name}
      type={type}
    />
  ) : (
    <input 
      name={name}
      type={type}
      placeholder={placeholder}
     />
  ) 
}