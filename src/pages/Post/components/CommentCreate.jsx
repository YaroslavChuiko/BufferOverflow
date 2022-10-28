import { Button, Text, Textarea, useToasts } from '@geist-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCreateCommentMutation } from '../../../store/api/commentSlice';
import { selectUser } from '../../../store/selectors';
import { validateLength } from '../../../validation/richTextValidation';
import s from './CommentCreate.module.scss';

const CommentCreate = ({ answerId, initialValue = ''}) => {
  const { setToast } = useToasts();
  const { loggedIn, userData } = useSelector(selectUser);
  const [editorValue, setEditorValue] = useState(initialValue);
  const [notify, setNotify] = useState({ type: 'default', message: '' });

  const [createComment, { isLoading, isSuccess }] = useCreateCommentMutation();

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

    const newComment = {
      author_id: userData.id,
      answer_id: answerId,
      content: plainText,
      status: 'active',
    };
    try {
      await createComment(newComment).unwrap();
      setEditorValue('');
      setNotify({ type: 'success', message: 'Successfully posted.' });
    } catch (error) {
      setNotify({ type: 'default', message: '' });
      setToast({
        text: error.message,
        type: 'error',
      });
    }
  };

  return (
    <div className={s.commentCreate}>
      <form onSubmit={handleSubmit}>
        <Textarea
          value={editorValue}
          onChange={handleTextareaChange}
          type={notify.type}
          placeholder="Write a comment..."
          width="100%"
          height="100px"
        />
        <div className={s.notify}>
          <Text span type={notify.type}>
            {notify.message}
          </Text>
        </div>
        <Button loading={isLoading} auto type="success-light" ghost font="14px" scale={0.7} htmlType="submit">
          Post your comment
        </Button>
      </form>
    </div>
  );
};

export default CommentCreate;
