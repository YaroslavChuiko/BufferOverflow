import { Button, Dot, Input, Text, useToasts } from '@geist-ui/core';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useConfirmResetPasswordMutation } from '../../store/api/authSlice';
import { comparePasswords, validatePassword } from '../../validation/userValidation';
import s from './ResetPassword.module.scss';

const ResetPassword = () => {
  const { token } = useParams();
  const { setToast } = useToasts();
  const [isPasswordReseted, setIsPasswordReseted] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [repassword, setRepassword] = useState('');
  const [repasswordMessage, setRepasswordMessage] = useState('');

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordMessage(validatePassword(value));
  };

  const handleRepasswordChange = (e) => {
    const value = e.target.value;
    setRepassword(value);
    setRepasswordMessage(comparePasswords(password, value));
  };

  const [confirmResetPassword, { isLoading }] = useConfirmResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validatePassword(password) || comparePasswords(password, repassword)) {
      setPasswordMessage(validatePassword(password));
      setRepasswordMessage(comparePasswords(password, repassword));
      return;
    }

    try {
      const response = await confirmResetPassword({ token, newPassword: password }).unwrap();

      if (!response.success) {
        setToast({
          text: response.message,
          type: 'error',
          delay: 3000,
        });
        return;
      }

      setIsPasswordReseted(true);
    } catch (error) {
      setToast({
        text: error.message,
        type: 'error',
        delay: 3000,
      });
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
          <h1 className={s.title}>Reset password</h1>
          <form className={s.form} onSubmit={handleSubmit}>
            {isPasswordReseted ? (
              <>
                <div className={s.successMessage}>Your password has been reset successfully!</div>
                <Link className={s.link} to={'/login'}>
                  log in
                </Link>
              </>
            ) : (
              <>
                <Input.Password
                  value={password}
                  type={passwordMessage ? 'error' : 'default'}
                  onChange={handlePasswordChange}
                  id="password"
                  name="password"
                  scale={1.1}
                  placeholder="New password"
                  mb="15px"
                  w="100%"
                >
                  <label htmlFor="password" className={s.label}>
                    New password
                  </label>
                  {notyfication(passwordMessage)}
                </Input.Password>

                <Input.Password
                  value={repassword}
                  type={repasswordMessage ? 'error' : 'default'}
                  onChange={handleRepasswordChange}
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

                <Button
                  loading={isLoading}
                  disabled={isPasswordReseted}
                  type="secondary-light"
                  htmlType="submit"
                  mt="30px"
                  w="100%"
                >
                  Reset
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
