import { MouseEventHandler, ReactChild } from 'react'
import './Button.css'

type IButtonProps = {
  primary?: boolean,
  secondary?: boolean,
  onClick?: MouseEventHandler,
  type?: 'button' | 'submit' | 'reset', 
  children: ReactChild 
}

export const Button = ({ primary, secondary, onClick, type = 'button', children }: IButtonProps) => {
  let className = 'Button'
  if(primary) className += ' Button-Primary'
  if(secondary) className += ' Button-Secondary'

  return <button className={className} type={type} onClick={onClick} >{children}</button>
}