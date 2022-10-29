import { Input, Modal, Text, useToasts } from '@geist-ui/core';
import { useState } from 'react';
import { useResetPasswordMutation } from '../../../store/api/authSlice';
import { validateEmail } from '../../../validation/userValidation';

import s from './ResetPassword.module.scss';

const ResetPassword = ({ visible, onClose }) => {
  const { setToast } = useToasts();

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const handleSubmit = async () => {
    const message = validateEmail(email);

    setEmailMessage(message);

    if (message) {
      return;
    }

    try {
      const response = await resetPassword({ email }).unwrap();

      if (!response.success) {
        setEmailMessage(response.message);
        return;
      }

      setIsEmailSent(true);
    } catch (error) {
      setToast({
        text: error.message,
        type: 'error',
      });
    }
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Title>Reset password</Modal.Title>
      <Modal.Subtitle>Your identity needs to be verified</Modal.Subtitle>
      <Modal.Content>
        <div className={s.content}>
          {isEmailSent ? (
            <div className={s.successMessage}>The reset password link was sent to your email</div>
          ) : (
            <>
              <Input
                value={email}
                type={emailMessage ? 'error' : 'default'}
                onChange={handleEmailChange}
                scale={1.2}
                label="Email"
                placeholder="Email"
                htmlType="email"
              />
              {emailMessage && (
                <div className={s.validationMessage}>
                  <Text span type="error">
                    {emailMessage}
                  </Text>
                </div>
              )}
            </>
          )}
        </div>
      </Modal.Content>
      <Modal.Action passive onClick={onClose}>
        Cancel
      </Modal.Action>
      <Modal.Action disabled={isEmailSent} loading={isLoading} onClick={handleSubmit}>
        Submit
      </Modal.Action>
    </Modal>
  );
};

export default ResetPassword;
