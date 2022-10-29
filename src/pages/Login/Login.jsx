import { Button, Dot, Input, Text, useToasts } from '@geist-ui/core';
import { Lock, User } from '@geist-ui/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../store/api/authSlice';
import { userSlice } from '../../store/slices/userSlice';
import ResetPassword from './components/ResetPassword';
import s from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToast } = useToasts();
  const [isModalActive, setIsModalActive] = useState(false);

  const [login, setLogin] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [loginUser, { isLoading }] = useLoginMutation();

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    setLoginMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMessage('');
  };

  const showModal = (e) => {
    e.preventDefault();
    setIsModalActive(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { login, password };

    try {
      const response = await loginUser(data).unwrap();

      if (!response.success) {
        setLoginMessage(response.message);
        setPasswordMessage(response.message);
        return;
      }
      dispatch(userSlice.actions.setUser(response.user));
      navigate(-1);
    } catch (error) {
      setToast({
        text: error.message,
        type: 'error',
      });
      console.error(error);
    }
  };

  const notyfication = (message) => {
    if (!message) {
      return;
    }

    return (
      <>
        <Dot type="error" scale={0.5} />
        <Text small type="error">
          {message}
        </Text>
      </>
    );
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.content}>
          <h1 className={s.title}>Log in to your account</h1>
          <form className={s.form} onSubmit={handleSubmit}>
            <Input
              value={login}
              onChange={handleLoginChange}
              type={loginMessage ? 'error' : 'default'}
              icon={<User color={loginMessage ? 'red' : ''} />}
              id="login"
              name="login"
              scale={1.1}
              placeholder="Login"
              mb="15px"
              w="100%"
            >
              <label htmlFor="login" className={s.label}>
                Login
              </label>
              {notyfication(loginMessage)}
            </Input>

            <Input.Password
              value={password}
              onChange={handlePasswordChange}
              type={passwordMessage ? 'error' : 'default'}
              icon={<Lock color={passwordMessage ? 'red' : ''} />}
              id="password"
              name="password"
              scale={1.1}
              placeholder="Password"
              w="100%"
            >
              <label htmlFor="password" className={s.label}>
                Password
              </label>
              {notyfication(passwordMessage)}
            </Input.Password>

            <Button loading={isLoading} type="secondary-light" htmlType="submit" mt="30px" w="100%">
              Log in
            </Button>
          </form>

          <div className={s.footer}>
            <div className={s.register}>
              Don't have an account yeat?{' '}
              <Link className={s.registerLink} to="/register">
                Sign up
              </Link>
            </div>
            <a href="#" onClick={showModal}>
              Forget your password?
            </a>
          </div>
        </div>
      </div>
      <ResetPassword visible={isModalActive} onClose={() => setIsModalActive(false)} />
    </div>
  );
};

export default Login;
