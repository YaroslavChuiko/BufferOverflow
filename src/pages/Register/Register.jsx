import { Button, Dot, Input, Text, useToasts } from '@geist-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../../store/api/authSlice';
import { userSlice } from '../../store/slices/userSlice';
import { comparePasswords, validateEmail, validateLogin, validateName, validatePassword } from '../../validation/userValidation';
import s from './Register.module.scss';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToast } = useToasts();

  const [login, setLogin] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const [firstName, setFirstName] = useState('');
  const [firstNameMessage, setFirstNameMessage] = useState('');

  const [lastName, setLastName] = useState('');
  const [lastNameMessage, setLastNameMessage] = useState('');

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [repassword, setRepassword] = useState('');
  const [repasswordMessage, setRepasswordMessage] = useState('');

  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [loginUser, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleInputChange = (e, setInputValue, validateValue, setInputMessage) => {
    const value = e.target.value;
    setInputValue(value);
    setInputMessage(validateValue(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { login, firstName, lastName, email, password, repassword };

    //!validate all fileds

    try {
      const registerRes = await registerUser(data).unwrap();

      if (!registerRes.success) {
        showErrors(registerRes.errors);
        return;
      }

      setToast({ text: registerRes.message, type: 'success', delay: 4000 });
    } catch (error) {
      setToast({
        text: error.message,
        type: 'error',
      });
      console.error(error);
    }

    try {
      const loginRes = await loginUser({ login, password }).unwrap();

      if (!loginRes.success) {
        setToast({
          text: 'Login error',
          type: 'error',
          delay: 3000,
        });
        return;
      }

      dispatch(userSlice.actions.setUser(loginRes.user));
      navigate('/', { replace: true });
    } catch (error) {
      setToast({
        text: error.message,
        type: 'error',
      });
      console.error(error);
    }
  };

  const showErrors = ({ login, firstName, lastName, email, password, repassword }) => {
    if (login) {
      setLoginMessage(login);
    }
    if (firstName) {
      setFirstNameMessage(firstName);
    }
    if (lastName) {
      setLastNameMessage(lastName);
    }
    if (email) {
      setEmailMessage(email);
    }
    if (password) {
      setPasswordMessage(password);
    }
    if (repassword) {
      setRepasswordMessage(repassword);
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
          <h1 className={s.title}>Create an account</h1>
          <form className={s.form} onSubmit={handleSubmit}>
            <Input
              value={login}
              type={loginMessage ? 'error' : 'default'}
              onChange={(e) => {
                handleInputChange(e, setLogin, validateLogin, setLoginMessage);
              }}
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

            <Input
              value={firstName}
              type={firstNameMessage ? 'error' : 'default'}
              onChange={(e) => {
                handleInputChange(e, setFirstName, validateName, setFirstNameMessage);
              }}
              id="firstName"
              name="firstName"
              scale={1.1}
              placeholder="First name"
              mb="15px"
              w="100%"
            >
              <label htmlFor="firstName" className={s.label}>
                First name
              </label>
              {notyfication(firstNameMessage)}
            </Input>

            <Input
              value={lastName}
              type={lastNameMessage ? 'error' : 'default'}
              onChange={(e) => {
                handleInputChange(e, setLastName, validateName, setLastNameMessage);
              }}
              id="lastName"
              name="lastName"
              scale={1.1}
              placeholder="Last name"
              mb="15px"
              w="100%"
            >
              <label htmlFor="lastName" className={s.label}>
                Last name
              </label>
              {notyfication(lastNameMessage)}
            </Input>

            <Input
              value={email}
              type={emailMessage ? 'error' : 'default'}
              onChange={(e) => {
                handleInputChange(e, setEmail, validateEmail, setEmailMessage);
              }}
              id="email"
              name="email"
              scale={1.1}
              placeholder="Email address"
              mb="15px"
              w="100%"
            >
              <label htmlFor="email" className={s.label}>
                Email address
              </label>
              {notyfication(emailMessage)}
            </Input>

            <Input.Password
              value={password}
              type={passwordMessage ? 'error' : 'default'}
              onChange={(e) => {
                handleInputChange(e, setPassword, validatePassword, setPasswordMessage);
              }}
              id="password"
              name="password"
              scale={1.1}
              placeholder="Password"
              mb="15px"
              w="100%"
            >
              <label htmlFor="password" className={s.label}>
                Password
              </label>
              {notyfication(passwordMessage)}
            </Input.Password>

            <Input.Password
              value={repassword}
              type={repasswordMessage ? 'error' : 'default'}
              onChange={(e) => {
                handleInputChange(e, setRepassword, comparePasswords.bind(this, password), setRepasswordMessage);
              }}
              id="repassword"
              name="repassword"
              scale={1.1}
              placeholder="Repeat password"
              w="100%"
            >
              <label htmlFor="repassword" className={s.label}>
                Repeat password
              </label>
              {notyfication(repasswordMessage)}
            </Input.Password>

            <Button loading={isRegisterLoading || isLoginLoading} type="secondary-light" htmlType="submit" mt="30px" w="100%">
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
