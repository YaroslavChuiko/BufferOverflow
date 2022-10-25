import { Button, Input, Text, useToasts } from '@geist-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateUserDataMutation } from '../../../store/api/apiSlice';
import { selectUser } from '../../../store/selectors';
import { userSlice } from '../../../store/slices/userSlice';
import { validateDataToUpdate } from '../../../validation/userValidation';

import s from './ChangeData.module.scss';

const ChangeData = () => {
  const { userData } = useSelector(selectUser);
  const { setToast } = useToasts();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(userData.fullName.split(' ')[0]);
  const [firstNameMessage, setFirstNameMessage] = useState('');

  const [lastName, setLastName] = useState(userData.fullName.split(' ')[1]);
  const [lastNameMessage, setLastNameMessage] = useState('');

  const [login, setLogin] = useState(userData.login);
  const [loginMessage, setLoginMessage] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const [updateUserData, { isLoading, isSuccess }] = useUpdateUserDataMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = validateDataToUpdate(firstName, lastName, login);

    setFirstNameMessage(result.firstName);
    setLastNameMessage(result.lastName);
    setLoginMessage(result.login);

    if (!result.success) {
      return;
    }

    const data = {
      id: userData.id,
      full_name: `${firstName} ${lastName}`,
      login,
      profile_picture: userData.avatar,
      role: userData.role,
    };

    try {
      const response = await updateUserData(data).unwrap();

      if (response?.errors?.login) {
        setLoginMessage(response.errors.login);
        return;
      }
      dispatch(userSlice.actions.setUser(response));
      setToast({
        text: "Your profile successfully updated!",
        type: 'success',
        delay: 3000,
      });
      navigate('/profile');
    } catch (error) {
      setToast({
        text: error.message,
        type: 'error',
      });
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.row}>
        <Input
          value={login}
          type={loginMessage ? 'error' : 'default'}
          onChange={handleLoginChange}
          id="login"
          name="login"
          placeholder="Login"
        >
          <label htmlFor="login" className={s.label}>
            Login
          </label>
        </Input>
        {loginMessage && (
          <div className={s.validationMessage}>
            <Text span type="error">
              {loginMessage}
            </Text>
          </div>
        )}
      </div>

      <div className={s.row}>
        <Input
          value={firstName}
          type={firstNameMessage ? 'error' : 'default'}
          onChange={handleFirstNameChange}
          id="firstName"
          name="firstName"
          placeholder="First name"
        >
          <label htmlFor="firstName" className={s.label}>
            First name
          </label>
        </Input>
        {firstNameMessage && (
          <div className={s.validationMessage}>
            <Text span type="error">
              {firstNameMessage}
            </Text>
          </div>
        )}
      </div>

      <div className={s.row}>
        <Input
          value={lastName}
          type={lastNameMessage ? 'error' : 'default'}
          onChange={handleLastNameChange}
          id="lastName"
          name="lastName"
          placeholder="Last name"
        >
          <label htmlFor="lastName" className={s.label}>
            Last name
          </label>
        </Input>
        {lastNameMessage && (
          <div className={s.validationMessage}>
            <Text span type="error">
              {lastNameMessage}
            </Text>
          </div>
        )}
      </div>

      <Button loading={isLoading} type="success-light" htmlType="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default ChangeData;
