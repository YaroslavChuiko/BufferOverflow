import { Button, Divider, Input, Select, Text, useToasts } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../shared/Container/Container';
import CustomMultiSelect from '../../shared/CustomMultiSelect/CustomMultiSelect';
import RichTextEditor from '../../shared/RichTextEditor/RichTextEditor';
import { useLazyGetCategoriesQuery } from '../../store/api/apiSlice';
import { useGetPostQuery, useLazyGetPostCategoriesQuery, useUpdatePostMutation } from '../../store/api/postSlice';
import { STATUS_OPTIONS } from '../../utils/constants';
import { validatePostData } from '../../validation/postValidation';

import s from './PostEdit.module.scss';

const PostEdit = () => {
  const { postId } = useParams();
  // const postId = 10;
  const navigate = useNavigate();
  const { setToast } = useToasts();

  const [title, setTitle] = useState('');
  const [titleMessage, setTitleMessage] = useState('');

  const [body, setBody] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');

  const [status, setStatus] = useState(STATUS_OPTIONS[0]);

  const [tags, setTags] = useState([]);
  const [tagsMessage, setTagsMessage] = useState('');

  const {
    data: post,
    isLoading: isPostLoading,
    isSuccess: isPostSuccess,
    isError: isPostError,
    error: postError,
  } = useGetPostQuery(postId);

  const [getPostCategories, { data: categories, isLoading: isCategoriesLoading, isSuccess: isCategoriesSuccess }] =
    useLazyGetPostCategoriesQuery();
  const [getCategories, { data, isFetching }] = useLazyGetCategoriesQuery();
  const [updatePost, { isLoading, isSuccess }] = useUpdatePostMutation();

  useEffect(() => {
    if (post?.post_categories) {
      const params = new URLSearchParams();
      post.post_categories.forEach((value) => params.append('id', value));
      getPostCategories(`?${params.toString()}`);
    }
  }, [post]);

  useEffect(() => {
    if (isPostSuccess) {
      setTitle(post.title);
      setBody(post.content);
      setStatus(post.status);
    }
  }, [isPostSuccess]);

  useEffect(() => {
    if (isCategoriesSuccess) {
      setTags(categories.map((item) => ({ id: item.id, label: item.title, value: item.title })));
    }
  }, [isCategoriesSuccess]);

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

    const updatedPost = {
      id: post.id,
      author_id: post.author_id,
      title,
      content: normalizedBody,
      post_categories: tags.map((tag) => tag.id),
      status: status,
    };

    try {
      const post = await updatePost(updatedPost).unwrap();
      navigate(`/post/${post.id}`);
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
          <h1 className={s.title}>Edit your question</h1>
          <Divider />
        </div>

        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.formRow}>
            <label className={s.label} htmlFor="title">
              Title
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
            <label className={s.label} htmlFor="body">
              Status
            </label>
            <Select placeholder="Status..." value={status} onChange={setStatus} mt="10px">
              {STATUS_OPTIONS.map((option, index) => (
                <Select.Option key={index} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className={s.formRow}>
            <label className={s.label} htmlFor="tags">
              Tags
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
            Save changes
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default PostEdit;
