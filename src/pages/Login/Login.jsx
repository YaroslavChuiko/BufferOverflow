import { Button, Dot, Input, Text, useToasts } from '@geist-ui/core';
import { Lock, User } from '@geist-ui/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../lib/axios';
import { userSlice } from '../../store/slices/userSlice';
import s from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const initialInputStatus = { type: '', message: '', showNotify: false, notifyType: '' };

  const [login, setLogin] = useState('');
  const [loginStatus, setLoginStatus] = useState(initialInputStatus);

  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(initialInputStatus);

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    setLoginStatus((prevVal) => ({ ...prevVal, type: '' }));
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordStatus((prevVal) => ({ ...prevVal, type: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { login, password };

    try {
      setLoading(true);
      const response = await api.post('auth/login', data);
      setLoading(false);

      if (!response.data.success) {
        // const inputStatus = {
        //   type: response.data.success ? '' : 'error',
        //   message: response.data.message,
        //   showNotify: !response.data.success,
        //   notifyType: response.data.success ? '' : 'error',
        // };
        const inputStatus = {
          type: 'error',
          message: response.data.message,
          showNotify: !response.data.success,
          notifyType: 'error',
        };
  
        setLoginStatus(inputStatus);
        setPasswordStatus(inputStatus);
      } else {
        //save user data to store
        dispatch(userSlice.actions.set(response.data.user));
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
      setToast({
        text: error.message,
        type: 'error',
      });
      console.error(error);
    }
  };

  const notyfication = (showNotify, notifyType, message) => (
    <span className={showNotify ? '' : s.hide}>
      <Dot type={notifyType} scale={0.5}/>
      <Text small type={notifyType}>
        {message}
      </Text>
    </span>
  );

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.logo}>
          <Link to={'/'}>
            Logo
          </Link>
        </div>
        <div className={s.content}>
          <Text h2 font="22px" className={s.title}>
            Log in to your account
          </Text>
          <form className={s.form} onSubmit={handleSubmit}>
            <Input
              id="login"
              name="login"
              icon={<User color={loginStatus.type ? 'red' : ''} />}
              type={loginStatus.type ? 'error' : 'default'}
              scale={1.1}
              placeholder="Login"
              value={login}
              onChange={handleLoginChange}
              mb="15px"
              w="100%"
            >
              {/* <Text b font="14px" ml="5px">
                Login
              </Text> */}
              <label htmlFor="login" className={s.label}>
                Login
              </label>
              {notyfication(loginStatus.showNotify, loginStatus.notifyType, loginStatus.message)}
            </Input>

            <Input.Password
              id="password"
              name="password"
              icon={<Lock color={passwordStatus.type ? 'red' : ''} />}
              type={passwordStatus.type ? 'error' : 'default'}
              scale={1.1}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              w="100%"
            >
              {/* <Text b font="14px" ml="5px">
                Password
              </Text> */}
              <label htmlFor="password" className={s.label}>
                Password
              </label>
              {notyfication(passwordStatus.showNotify, passwordStatus.notifyType, passwordStatus.message)}
            </Input.Password>

            <Button loading={loading} type="secondary-light" htmlType="submit" mt="30px" w="100%">
              Log in
            </Button>
          </form>

          <Text span type="secondary">
            Don't have an account yeat?{' '}
            <Link className={s.registerLink} to="/register" >
              Sign up
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
