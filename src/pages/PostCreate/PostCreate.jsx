import { Button, Divider, Input, Text, useTheme, useToasts } from '@geist-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../../shared/Container/Container';
import CustomMultiSelect from '../../shared/CustomMultiSelect/CustomMultiSelect';
import RichTextEditor from '../../shared/RichTextEditor/RichTextEditor';
import { useLazyGetCategoriesQuery } from '../../store/api/apiSlice';
import { useCreatePostMutation } from '../../store/api/postSlice';
import { selectUser } from '../../store/selectors';
import { validatePostData } from '../../validation/postValidation';

import s from './PostCreate.module.scss';

const PostCreate = () => {
  const navigate = useNavigate();
  const { userData } = useSelector(selectUser);
  const { setToast } = useToasts();

  const [title, setTitle] = useState('');
  const [titleMessage, setTitleMessage] = useState('');

  const [body, setBody] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');

  const [tags, setTags] = useState([]);
  const [tagsMessage, setTagsMessage] = useState('');

  const [getCategories, { data, isFetching }] = useLazyGetCategoriesQuery();
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTagsChange = (val) => {
    setTags(val);
  };

  const loadOptions = async (inputValue, callback) => {
    const categories = await getCategories(inputValue).unwrap();
    callback(categories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedBody = body.replace(/<p><br><\/p>+/g, ''); //delete extra <p><br></p> substrs

    const result = validatePostData(title, normalizedBody, tags);

    setTitleMessage(result.title);
    setBodyMessage(result.body);
    setTagsMessage(result.tags);

    if (!result.success) {
      return;
    }

    const newPost = {
      author_id: userData.id,
      title,
      content: normalizedBody,
      post_categories: tags.map(tag => tag.id),
      status: 'active',
    };

    try {
      const post = await createPost(newPost).unwrap();
      navigate(`/post/${post.id}`)
    } catch (error) {
      setToast({
        text: error.message,
        type: 'error',
      });
    }
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
            <label className={s.label} htmlFor="title">
              Title
              <div className={s.description}>Be specific and imagine you’re asking a question to another person</div>
            </label>
            <Input
              value={title}
              onChange={handleTitleChange}
              type={titleMessage ? 'error' : 'default'}
              id="title"
              name="title"
              htmlType="text"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              width="100%"
            />
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

          <div className={s.formRow}>
            <label className={s.label} htmlFor="tags">
              Tags
              <div className={s.description}>Add up to 5 tags to describe what your question is about</div>
            </label>
            <CustomMultiSelect
              value={tags}
              placeholder="e.g. (ios node.js mongodb)"
              onChange={handleTagsChange}
              loadOptions={loadOptions}
            />
            {tagsMessage && (
              <div className={s.validationMessage}>
                <Text span type="error">
                  {tagsMessage}
                </Text>
              </div>
            )}
          </div>

          <Button loading={isLoading} type="success-light" htmlType="submit">
            Post your question
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default PostCreate;
