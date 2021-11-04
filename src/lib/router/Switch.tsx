import { ReactNodeArray, Children, isValidElement, ReactNode, cloneElement, useContext } from 'react'
import { RouteContext } from './RouteContext'

export const Switch = ({ children }: { children?: ReactNodeArray }) => {
  const { history } = useContext(RouteContext)
  const { uri } = history;
  let activeRoute = null
  Children.forEach(children, (child: ReactNode) => {
    if(uri !== null && isValidElement(child)) {
      const { path } = child.props || {}
      if(path === uri){
        activeRoute = cloneElement(child, { history })
      }
    }
  })
  return activeRoute
}