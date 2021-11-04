import { useAuth } from '../../hooks';
import { Route, IRouteProps } from './Route';
import { Redirect } from '../Redirect'

export const GuestRoute = ({ children, ...rest }: IRouteProps) => {
  const auth: any = useAuth();
  const { user } = auth

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if(!user || !user.uid){ return children || null }
        else { return <Redirect to={{ pathname: '/main', state: { from: location } }} /> }
      }}
    />
  )
}