import { Input, Button, Card, Heading, Loader } from '../../components';
import { Form, FormErrors, useForm } from '../../lib/form';
import { IFormData } from '../../lib/form/FormContext';
import { useAuth } from '../../lib/hooks';
import { Link, useHistory } from '../../lib/router';
import './SignupForm.css'

type ISignupFormData = {
  email: IFormData;
  password: IFormData;
}

const SignupForm = () => {
  const formName = 'auth';
  const auth: any = useAuth();
  const { formData, setFormError, toggleFormLoading } = useForm()
  const { form } = formData[formName] || {}
  const { loading } = form || {}
  const handleSubmit = async (form: ISignupFormData) => {
    toggleFormLoading(formName)
    const result = await auth.signin(form?.email?.value, form?.password?.value);
    if(result && result.error){ setFormError(formName, result.error); }
    toggleFormLoading(formName)
  };
  return (
    <Card>
      <Loader active={loading} />
      <Heading>Sign up</Heading>
      <Form name={formName} onSubmit={handleSubmit}>
        <Form.Control label='Email' full>
          <Input type='email' controlled name='email' placeholder='Email' />
          <FormErrors formName={formName} field='email' />
        </Form.Control>
        <Form.Control label='Password' full>
          <Input type='password' controlled name='password' placeholder='Password' />
          <FormErrors formName={formName} field='password' />
        </Form.Control>
        <FormErrors formName={formName} />
        <div className='SignupForm-Button__Container'>
          <Button type='submit' primary>Sign up</Button>
          <span>----------- OR ------------</span>
          <Link to='/auth' render={<Button>Log in</Button>} />
        </div>
      </Form>
    </Card>
  );
}
export default SignupForm