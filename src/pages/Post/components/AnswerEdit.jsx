import { Button, Select, Text, useToasts } from '@geist-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import RichTextEditor from '../../../shared/RichTextEditor/RichTextEditor';
import { useUpdateAnswerMutation } from '../../../store/api/answerSlice';
import { selectUser } from '../../../store/selectors';
import { STATUS_OPTIONS } from '../../../utils/constants';
import { validateLength } from '../../../validation/richTextValidation';
import s from './AnswerEdit.module.scss';

const AnswerEdit = ({ answer, setIsEdit }) => {
  const { setToast } = useToasts();
  const { loggedIn, userData } = useSelector(selectUser);
  const [editorValue, setEditorValue] = useState(answer.content);
  const [statusValue, setStatusValue] = useState(answer.status);
  const [notify, setNotify] = useState({ type: 'default', message: '' });

  const [updateAnswer, { isLoading, isSuccess }] = useUpdateAnswerMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const html = editorValue.replace(/<p><br><\/p>+/g, ''); //delete extra <p><br></p> substrs

    const msg = validateLength(html);

    if (msg) {
      setNotify({ type: 'error', message: msg });
      return;
    }

    const data = {
      id: answer.id,
      author_id: userData.id,
      answer_id: answer.answer_id,
      content: html,
      status: statusValue,
    };
    try {
      await updateAnswer(data).unwrap();
      setEditorValue('');
      setNotify({ type: 'success', message: 'Changes saved' });
      setIsEdit(false);
    } catch (error) {
      setNotify({ type: 'default', message: '' });
      setToast({
        text: error.message,
        type: 'error',
      });
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setIsEdit(false);
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit}>
        <RichTextEditor editorValue={editorValue} setEditorValue={setEditorValue} />
        <div className={s.notify}>
          <Text span type={notify.type}>
            {notify.message}
          </Text>
        </div>
        <Select placeholder="Status..." value={statusValue} onChange={setStatusValue} mt="10px">
          {STATUS_OPTIONS.map((option, index) => (
            <Select.Option key={index} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>

        <div className={s.actions}>
          <Button loading={isLoading} auto type="success-light" ghost font="14px" scale={0.7} htmlType="submit" mr="10px">
            Save changes
          </Button>
          <Button auto type="default-light" ghost font="14px" scale={0.7} onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AnswerEdit;
