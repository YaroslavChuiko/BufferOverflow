import { Button, Divider, Text, useToasts } from '@geist-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RichTextEditor from '../../../shared/RichTextEditor/RichTextEditor';
import { useAddNewAnswerMutation } from '../../../store/api/apiSlice';
import { selectUser } from '../../../store/selectors';
import { validateLength } from '../../../validation/richTextValidation';
import s from './AnswerEditor.module.scss';

const AnswerEditor = ({ postId }) => {
  const { setToast } = useToasts();
  const { loggedIn, userData } = useSelector(selectUser);
  const [editorValue, setEditorValue] = useState('');
  const [notify, setNotify] = useState(null);

  const [addNewAnswer, { isLoading, isSuccess }] = useAddNewAnswerMutation();

  const postAnswerClick = async (e) => {
    e.preventDefault();
    const msg = validateLength(editorValue);

    if (msg) {
      setNotify({ type: 'error', message: msg });
      return;
    }

    const newAnswer = {
      author_id: userData.id,
      post_id: postId,
      content: editorValue,
      status: 'active',
    };
    try {
      await addNewAnswer(newAnswer).unwrap();
      setEditorValue('');
      setNotify({ type: 'success', message: 'Successfully posted.' });
    } catch (error) {
      setNotify(null);
      setToast({
        text: error.message,
        type: 'error',
      });
    }
  };

  return (
    <div className={s.answerEditor}>
      <div className={s.header}>
        <div className={s.headerContent}>
          <h3 className={s.headerTitle}>{'Your Answer'}</h3>
        </div>
        <Divider />
      </div>
      {loggedIn ? (
        <>
          <RichTextEditor editorValue={editorValue} setEditorValue={setEditorValue} />
          {notify && (
            <div className={s.notify}>
              <Text span type={notify.type}>
                {notify.message}
              </Text>
            </div>
          )}
          <div className={s.preview} dangerouslySetInnerHTML={{ __html: editorValue }}></div>

          <Button loading={isLoading} type="success-light" htmlType="submit" onClick={postAnswerClick}>
            Post your answer
          </Button>
        </>
      ) : (
        <div className={s.notLoggedIn}>
          <Link to={'/login'}>Login</Link>
          <span>to post an answer</span>
        </div>
      )}
    </div>
  );
};

export default AnswerEditor;
