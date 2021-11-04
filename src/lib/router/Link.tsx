import { useContext, cloneElement } from 'react';
import { RouteContext } from './RouteContext';
import { ILocationTo } from './Router';

export type ILinkProps = { to: ILocationTo, children?: JSX.Element | string, render?: JSX.Element };
export const Link = ({ to, children, render }: ILinkProps) => {
  const { history } = useContext(RouteContext);
  const { push } = history;
  const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    push(to);
  };
  return render ? cloneElement(render, { onClick: onClickHandler }) : (<a href={typeof to === 'string' ? to : to.pathname} onClick={onClickHandler} >{children || null}</a>)
}