import { ReactNodeArray } from "react"
import "./Card.css"

export const Card = ({ children } : { children: JSX.Element | ReactNodeArray }) => {
  return <div className='Card' >{children}</div>
}