import { Button, Dot, Input, Text } from '@geist-ui/core';
import { Lock, User } from '@geist-ui/icons';
import { Mail } from '@geist-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './Register.module.scss';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

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
      setLoading(true);
      const response = await api.post('auth/register', data);
      setLoading(false);
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
      <Dot type={notifyType} />
      <Text small type={notifyType}>
        {message}
      </Text>
    </span>
  );

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.logo}>
          <Link to={'/'}>Logo</Link>
        </div>
        <div className={s.content}>
          <Text h2 font="22px" className={s.title}>
            Create an account
          </Text>
          <form className={s.form} onSubmit={handleSubmit}>
            <Input
              id="login"
              name="login"
              // icon={<User />}
              // type={loginStatus.type ? 'error' : 'default'}
              scale={1.1}
              placeholder="Login"
              value={login}
              onChange={handleLoginChange}
              mb="15px"
              w="100%"
            >
              <label htmlFor="login" className={s.label}>
                Login
              </label>
              {/* {notyfication(loginStatus.showNotify, loginStatus.notifyType, loginStatus.message)} */}
            </Input>

            <Input
              id="firstName"
              name="firstName"
              // icon={<User />}
              // type={loginStatus.type ? 'error' : 'default'}
              scale={1.1}
              placeholder="First name"
              value={login}
              onChange={handleLoginChange}
              mb="15px"
              w="100%"
            >
              <label htmlFor="firstName" className={s.label}>
                First name
              </label>
              {/* {notyfication(loginStatus.showNotify, loginStatus.notifyType, loginStatus.message)} */}
            </Input>

            <Input
              id="lastName"
              name="lastName"
              // icon={<User />}
              // type={loginStatus.type ? 'error' : 'default'}
              scale={1.1}
              placeholder="Last name"
              value={login}
              onChange={handleLoginChange}
              mb="15px"
              w="100%"
            >
              <label htmlFor="lastName" className={s.label}>
                Last name
              </label>
              {/* {notyfication(loginStatus.showNotify, loginStatus.notifyType, loginStatus.message)} */}
            </Input>

            <Input
              id="email"
              name="email"
              // icon={<Mail />}
              // type={emailStatus.type ? 'error' : 'default'}
              scale={1.1}
              placeholder="Email address"
              value={login}
              onChange={handleLoginChange}
              mb="15px"
              w="100%"
            >
              <label htmlFor="email" className={s.label}>
                Email address
              </label>
              {/* {notyfication(emailStatus.showNotify, emailStatus.notifyType, emailStatus.message)} */}
            </Input>

            <Input.Password
            // hideToggle
              id="password"
              name="password"
              // icon={<Lock />}
              // type={passwordStatus.type ? 'error' : 'default'}
              scale={1.1}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              mb="15px"
              w="100%"
            >
              <label htmlFor="password" className={s.label}>
                Password
              </label>
              {/* {notyfication(passwordStatus.showNotify, passwordStatus.notifyType, passwordStatus.message)} */}
            </Input.Password>

            <Input.Password
            // hideToggle
              id="repassword"
              name="repassword"
              // icon={<Lock />}
              // type={passwordStatus.type ? 'error' : 'default'}
              scale={1.1}
              placeholder="Repeat password"
              value={password}
              onChange={handlePasswordChange}
              w="100%"
            >
              <label htmlFor="repassword" className={s.label}>
                Repeat password
              </label>
              {/* {notyfication(passwordStatus.showNotify, passwordStatus.notifyType, passwordStatus.message)} */}
            </Input.Password>

            <Button loading={loading} type="secondary-light" htmlType="submit" mt="30px" w="100%">
              Sign up
            </Button>
          </form>

          <Text span type="secondary">
            Already have an account?{' '}
            <Link className={s.registerLink} to="/login">
              Log in
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Register;
