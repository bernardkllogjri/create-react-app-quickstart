import { useContext } from "react"
import { FormContext } from "./FormContext"

export const useForm = () => {
  return useContext(FormContext)
}