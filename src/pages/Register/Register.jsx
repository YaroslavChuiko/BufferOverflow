import { Button, Dot, Input, Text, useToasts } from '@geist-ui/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../lib/axios';
import { comparePasswords, validateEmail, validateLogin, validateName, validatePassword } from '../../validation/authValidation';
import s from './Register.module.scss';

const Register = () => {
  const navigate = useNavigate();
  const { setToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const initialInputStatus = { type: '', message: '', showNotify: false, notifyType: '' };

  const [login, setLogin] = useState('');
  const [loginStatus, setLoginStatus] = useState(initialInputStatus);

  const [firstName, setFirstName] = useState('');
  const [firstNameStatus, setFirstNameStatus] = useState(initialInputStatus);

  const [lastName, setLastName] = useState('');
  const [lastNameStatus, setLastNameStatus] = useState(initialInputStatus);

  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState(initialInputStatus);

  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(initialInputStatus);

  const [repassword, setRepassword] = useState('');
  const [repasswordStatus, setRepasswordStatus] = useState(initialInputStatus);

  const handleInputChange = (e, setInputValue, validateValue, setInputStatus) => {
    const value = e.target.value;
    setInputValue(value);
    const inputErrorMsg = validateValue(value);
    if (inputErrorMsg) {
      setInputStatus({ type: 'error', message: inputErrorMsg, showNotify: true, notifyType: 'error' });
    } else {
      setInputStatus({ type: 'success', message: 'Successfully', showNotify: true, notifyType: 'success' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { login, firstName, lastName, email, password, repassword };

    try {
      setLoading(true);
      const registerRes = await api.post('auth/register', data);

      if (!registerRes.data.success) {
        showErrors(registerRes.data.errors);
        setToast({ text: registerRes.data.message, type: 'error' });
      } else {
        setToast({ text: registerRes.data.message, type: 'success', delay: 4000 });
        const loginRes = await api.post('auth/login', { login, password });
        //save user data to store
        navigate('/');
      }
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

  const showErrors = ({ login, firstName, lastName, email, password, repassword }) => {
    if (login) {
      setLoginStatus({ type: 'error', message: login, showNotify: true, notifyType: 'error' });
    }
    if (firstName) {
      setFirstNameStatus({ type: 'error', message: firstName, showNotify: true, notifyType: 'error' });
    }
    if (lastName) {
      setLastNameStatus({ type: 'error', message: lastName, showNotify: true, notifyType: 'error' });
    }
    if (email) {
      setEmailStatus({ type: 'error', message: email, showNotify: true, notifyType: 'error' });
    }
    if (password) {
      setPasswordStatus({ type: 'error', message: password, showNotify: true, notifyType: 'error' });
    }
    if (repassword) {
      setRepasswordStatus({ type: 'error', message: repassword, showNotify: true, notifyType: 'error' });
    }
  };

  const notyfication = (showNotify, notifyType, message) => (
    <span className={showNotify ? '' : s.hide}>
      <Dot type={notifyType} scale={0.5} />
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
              type={loginStatus.type}
              scale={1.1}
              placeholder="Login"
              value={login}
              onChange={(e) => {
                handleInputChange(e, setLogin, validateLogin, setLoginStatus);
              }}
              mb="15px"
              w="100%"
            >
              <label htmlFor="login" className={s.label}>
                Login
              </label>
              {notyfication(loginStatus.showNotify, loginStatus.notifyType, loginStatus.message)}
            </Input>

            <Input
              id="firstName"
              name="firstName"
              type={firstNameStatus.type}
              scale={1.1}
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                handleInputChange(e, setFirstName, validateName, setFirstNameStatus);
              }}
              mb="15px"
              w="100%"
            >
              <label htmlFor="firstName" className={s.label}>
                First name
              </label>
              {notyfication(firstNameStatus.showNotify, firstNameStatus.notifyType, firstNameStatus.message)}
            </Input>

            <Input
              id="lastName"
              name="lastName"
              type={lastNameStatus.type}
              scale={1.1}
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                handleInputChange(e, setLastName, validateName, setLastNameStatus);
              }}
              mb="15px"
              w="100%"
            >
              <label htmlFor="lastName" className={s.label}>
                Last name
              </label>
              {notyfication(lastNameStatus.showNotify, lastNameStatus.notifyType, lastNameStatus.message)}
            </Input>

            <Input
              id="email"
              name="email"
              type={emailStatus.type}
              scale={1.1}
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                handleInputChange(e, setEmail, validateEmail, setEmailStatus);
              }}
              mb="15px"
              w="100%"
            >
              <label htmlFor="email" className={s.label}>
                Email address
              </label>
              {notyfication(emailStatus.showNotify, emailStatus.notifyType, emailStatus.message)}
            </Input>

            <Input.Password
              id="password"
              name="password"
              type={passwordStatus.type}
              scale={1.1}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                handleInputChange(e, setPassword, validatePassword, setPasswordStatus);
              }}
              mb="15px"
              w="100%"
            >
              <label htmlFor="password" className={s.label}>
                Password
              </label>
              {notyfication(passwordStatus.showNotify, passwordStatus.notifyType, passwordStatus.message)}
            </Input.Password>

            <Input.Password
              id="repassword"
              name="repassword"
              type={repasswordStatus.type}
              scale={1.1}
              placeholder="Repeat password"
              value={repassword}
              onChange={(e) => {
                handleInputChange(e, setRepassword, comparePasswords.bind(this, password), setRepasswordStatus);
              }}
              w="100%"
            >
              <label htmlFor="repassword" className={s.label}>
                Repeat password
              </label>
              {notyfication(repasswordStatus.showNotify, repasswordStatus.notifyType, repasswordStatus.message)}
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
