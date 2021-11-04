import { useContext } from "react"
import { RouteContext } from "./RouteContext"

export const useHistory = () => {
  return useContext(RouteContext)
}