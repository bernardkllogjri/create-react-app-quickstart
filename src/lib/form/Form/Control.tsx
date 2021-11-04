import { ReactChild, ReactNodeArray } from "react"
import './Control.css'

export const Control = ({ children, label, full } : { children: ReactChild | ReactNodeArray, label?: string, full?: boolean }) => {
  let className = 'Control'
  if(full) className += ' Control-full'
  return (
    <div className={className}>
      {label && <div className='Control-Label'>{label}</div>}
      {children}
    </div>
  )
}