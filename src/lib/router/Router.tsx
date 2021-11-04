import { cloneElement, useState } from 'react';
import { RouteContext } from './RouteContext';

export type ILocationTo = { pathname: string, state: { [x: string]: any } } | string

export const Router = ({ children }: { children: JSX.Element }) => {
  const [uri, setURI] = useState(window.location.pathname);
  const { history } = window || {};
  if(!history) { throw new Error('History not available in this browser'); }
  window.onpopstate = () => { setURI(window.location.pathname) };
  const push = (url: ILocationTo) => { 
    const to = typeof url === 'string' ? url : url.pathname
    history.pushState(null, '', to); 
    setURI(to); 
  };
  return <RouteContext.Provider value={{ history: { uri, push } }}>{cloneElement(children, { history: { uri, push } })}</RouteContext.Provider>
}