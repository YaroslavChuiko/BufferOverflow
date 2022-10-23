import { Button, Select, Text, Textarea, useToasts } from '@geist-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateCommentMutation } from '../../../store/api/commentSlice';
import { selectUser } from '../../../store/selectors';
import { STATUS_OPTIONS } from '../../../utils/constants';
import { validateLength } from '../../../validation/richTextValidation';
import s from './CommentEdit.module.scss';

const CommentEdit = ({ comment, setIsEdit }) => {
  const { setToast } = useToasts();
  const { loggedIn, userData } = useSelector(selectUser);
  const [editorValue, setEditorValue] = useState(comment.content);
  const [statusValue, setStatusValue] = useState(comment.status);
  const [notify, setNotify] = useState({ type: 'default', message: '' });

  const [UpdateComment, { isLoading, isSuccess }] = useUpdateCommentMutation();

  const handleTextareaChange = (e) => {
    setEditorValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plainText = editorValue.replace(/[\r\n]+/g, ' '); //replace new lines

    const msg = validateLength(plainText);

    if (msg) {
      setNotify({ type: 'error', message: msg });
      return;
    }

    const data = {
      id: comment.id,
      author_id: userData.id,
      answer_id: comment.answer_id,
      content: plainText,
      status: statusValue,
    };
    try {
      await UpdateComment(data).unwrap();
      setEditorValue('');
      setNotify({ type: 'success', message: 'Changes saved.' });
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
        <Textarea
          value={editorValue}
          onChange={handleTextareaChange}
          type={notify.type}
          placeholder="Edit a comment..."
          width="100%"
          height="100px"
        />
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
          <Button auto type="default-light" ghost font="14px" scale={0.7} htmlType="reset" onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentEdit;
