import { Button, Divider, Input, Text, useToasts } from '@geist-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '../../shared/Container/Container';
import RichTextEditor from '../../shared/RichTextEditor/RichTextEditor';
import { useCreatePostMutation } from '../../store/api/apiSlice';
import { selectUser } from '../../store/selectors';
import { validatePostData } from '../../validation/postValidation';

import s from './PostCreate.module.scss';

const PostCreate = () => {
  const { userData } = useSelector(selectUser);
  const { setToast } = useToasts();

  const [title, setTitle] = useState('');
  const [titleMessage, setTitleMessage] = useState('');

  const [body, setBody] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');

  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedBody = body.replace(/<p><br><\/p>+/g, ''); //delete extra <p><br></p> substrs

    const result = validatePostData(title, normalizedBody, '');

    setTitleMessage(result.title);
    setBodyMessage(result.body);

    if (!result.success) {
      return;
    }

    setToast({
      text: 'Success',
      type: 'success',
    });

    // const newPost = {
    //   author_id: userData.id,
    //   title,
    //   content: body,
    //   post_categories: [],
    //   status: 'active',
    // };

    // try {
    //   await createComment(newComment).unwrap();
    //   // setEditorValue('');
    // } catch (error) {
    //   setToast({
    //     text: error.message,
    //     type: 'error',
    //   });
    // }
  };

  return (
    <Container>
      <div className={s.container}>
        <div className={s.header}>
          <h1 className={s.title}>Ask a public question</h1>
          <Divider />
        </div>

        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.formRow}>
            <Input
              value={title}
              onChange={handleTitleChange}
              type={titleMessage ? 'error' : 'default'}
              id="title"
              name="title"
              htmlType="text"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              width="100%"
              mb="5px"
            >
              <label className={s.label} htmlFor="title">
                Title
                <div className={s.description}>Be specific and imagine you’re asking a question to another person</div>
              </label>
            </Input>
            {titleMessage && (
              <div className={s.validationMessage}>
                <Text span type="error">
                  {titleMessage}
                </Text>
              </div>
            )}
          </div>

          <div className={s.formRow}>
            <label className={s.label} htmlFor="body">
              Body
              <div className={s.description}>Include all the information someone would need to answer your question</div>
            </label>
            <RichTextEditor editorValue={body} setEditorValue={setBody} />
            {bodyMessage && (
              <div className={s.validationMessage}>
                <Text span type="error">
                  {bodyMessage}
                </Text>
              </div>
            )}

            <div className={s.preview} dangerouslySetInnerHTML={{ __html: body }}></div>
          </div>

          <Button type="success-light" htmlType="submit">
            Post your question
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default PostCreate;
