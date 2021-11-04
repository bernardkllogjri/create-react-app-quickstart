import { Input, Button, Card, Heading, Loader } from '../../components';
import { Form, FormErrors, useForm } from '../../lib/form';
import { IFormData } from '../../lib/form/FormContext';
import { useAuth } from '../../lib/hooks';
import { Link } from '../../lib/router';
import './AuthForm.css'

type IAuthFormData = {
  email: IFormData;
  password: IFormData;
}

const AuthForm = () => {
  const formName = 'auth';
  const auth: any = useAuth()
  const { formData, setFormError, toggleFormLoading } = useForm()
  const { form } = formData[formName] || {}
  const { loading } = form || {}
  const handleSubmit = async (form: IAuthFormData) => {
    toggleFormLoading(formName)
    const result = await auth.signin(form?.email?.value, form?.password?.value);
    if(result && result.error){ setFormError(formName, result.error); }
    toggleFormLoading(formName)
  };

  return (
    <Card>
      <Loader active={loading} />
      <Heading>Log in</Heading>
      <Form name={formName} onSubmit={handleSubmit}>
        <Form.Control label='Email' full>
          <Input controlled type='email' name='email' placeholder='Email' validation="required" />
          <FormErrors formName={formName} field='email' />
        </Form.Control>
        <Form.Control label='Password' full>
          <Input controlled type='password' name='password' placeholder='Password' validation="required" />
          <FormErrors formName={formName} field='password' />
        </Form.Control>
        <FormErrors formName={formName} />
        <div className='AuthForm-Button__Container'>
          <Button type='submit' primary>Log in</Button>
          <span>----------- OR ------------</span>
          <Link to='/signup' render={<Button>Sign up</Button>} />
        </div>
      </Form>
    </Card>
  );
}
export default AuthForm