import { useContext, useEffect } from "react";
import { ILocationTo } from ".";
import { RouteContext } from "./RouteContext";

export type IRedirectProps = { to: ILocationTo };
export const Redirect = ({ to }: IRedirectProps) => {
  const { history } = useContext(RouteContext)
  const { push } = history
  
  useEffect(() => {
    if(to){ push && push(to); }
  },[])
  return null
}