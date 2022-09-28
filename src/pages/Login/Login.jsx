import { Button, Dot, Input, Note, Spacer, Text, useToasts } from '@geist-ui/core';
import { Lock, User } from '@geist-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/axios';
import s from './Login.module.scss';

const Login = () => {
  const { setToast } = useToasts();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState({success: true, message: ''});
  const [passwordtatus, setPasswordStatus] = useState({success: true, message: ''});

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { login, password };

    try {
      // const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`, data);
      const response = await api.post('auth/login', data);

      setLoginStatus(response.data);
      setPasswordStatus(response.data);
      console.log(response);


    } catch (error) {
      setToast({
        text: 'Network Error',
        type: 'error',
      });
      console.error(error);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.logo}>
          <Link to={'/'}>Logo</Link>
        </div>
        <div className={s.content}>
          <Text h3 className={s.title}>
            Log in to your account
          </Text>
          {/* <Note scale={0.7}  type="error" label="error" filled>Login or password is invalid</Note>
          <br/> */}
          <form onSubmit={handleSubmit}>
            <Input
              name="login"
              icon={<User color={loginStatus.success ? '' : 'red'} />}
              type={loginStatus.success ? 'default' : 'error'}
              scale={1.2}
              width="100%"
              placeholder="Login"
              onChange={handleLoginChange}
            >
            <div>
              <Dot type={loginStatus.success ? '' : 'error'} style={{ marginLeft: '10px' }}/>
                <Text small type="error">
                  {loginStatus.message}
                </Text>
              {/* </Dot> */}
            </div>
            </Input>
            <Spacer h={2} />
            <Input.Password
              name="password"
              icon={<Lock color={loginStatus.success ? '' : 'red'} />}
              type={loginStatus.success ? 'secondary' : 'error'}
              scale={1.2}
              width="100%"
              placeholder="Password"
              onChange={handlePasswordChange}
            >
              <div>
              <Dot type="error" style={{ marginLeft: '10px' }}/>
                <Text small type="error">
                  Login or password is invalid
                </Text>
              {/* </Dot> */}
            </div>
            </Input.Password>

            <Button type="secondary" htmlType="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
