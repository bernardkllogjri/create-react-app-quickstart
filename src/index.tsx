import ReactDOM from 'react-dom';
import { AuthProvider } from './lib/hooks';
import { FormProvider } from './lib/form';
import App from './App';
import './index.css';

ReactDOM.render(
  <AuthProvider>
    <FormProvider >
      <App />
    </FormProvider>
  </AuthProvider>,
  document.querySelector('#root'),
);
