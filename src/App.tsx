import { Router, Switch } from './lib/router';
import { PrivateRoute, GuestRoute } from './lib/router';
import { Auth, Main, MainCharacter, Signup } from './pages';

export default function App() {
  return (
    <Router>
      <Switch>
        <GuestRoute path="/auth"><Auth /></GuestRoute>
        <GuestRoute path="/signup"><Signup /></GuestRoute>
        <PrivateRoute path="/main" exact><Main /></PrivateRoute>
        <PrivateRoute path="/main/character/:characterId" exact><MainCharacter /></PrivateRoute>
      </Switch>
    </Router>
  );
}
