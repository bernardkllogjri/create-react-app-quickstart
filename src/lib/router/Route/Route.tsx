export type IRouteRenderProps = { location?: any }
export type IRouteProps = {
  render?: (args: IRouteRenderProps) => JSX.Element | null,
  children?: JSX.Element,
  exact?: boolean,
  path?: string
};

export const Route = ({ render, children }: IRouteProps) => {
  if(render){ return render({ location }); }
  else if(children) { return children; }
  return <div>op</div>
}