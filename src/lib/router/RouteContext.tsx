import { createContext } from 'react';
import { ILocationTo } from './Router';

const history = {
  push: (url: ILocationTo | string) => {},
  uri: '',
};
export const RouteContext = createContext({ history })