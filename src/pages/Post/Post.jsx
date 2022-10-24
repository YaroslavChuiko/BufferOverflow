import { Avatar, Divider, Loading, Tag, Text, useToasts } from '@geist-ui/core';
import moment from 'moment';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../shared/Container/Container';
import Vote from '../../shared/Vote/Vote';
import { useLazyGetAuthorQuery } from '../../store/api/apiSlice';
import { useDeletePostMutation, useGetPostQuery, useLazyGetPostCategoriesQuery } from '../../store/api/postSlice';
import { selectUser } from '../../store/selectors';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import AnswerCreate from './components/AnswerCreate';
import AnswerList from './components/AnswerList';
import s from './Post.module.scss';

const Post = () => {
  const { postId } = useParams();
  const { setToast } = useToasts();
  const navigate = useNavigate();
  // const postId = 1;
  const { loggedIn, userData } = useSelector(selectUser);

  const {
    data: post,
    isLoading: isPostLoading,
    isSuccess: isPostSuccess,
    isError: isPostError,
    error: postError,
  } = useGetPostQuery(postId);

  const [getPostAuthor, { data: author, isLoading: isAuthorLoading, isSuccess: isAuthorSuccess }] = useLazyGetAuthorQuery();
  const [getPostCategories, { data: categories, isLoading: isCategoriesLoading, isSuccess: isCategoriesSuccess }] =
    useLazyGetPostCategoriesQuery();
  const [deletePost, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }] = useDeletePostMutation();

  useEffect(() => {
    if (post?.author_id) {
      getPostAuthor(post.author_id);
    }

    if (post?.post_categories) {
      const params = new URLSearchParams();
      post.post_categories.forEach((value) => params.append('id', value));
      getPostCategories(`?${params.toString()}`);
    }
  }, [post]);

  const handleEditClick = async (e) => {
    e.preventDefault();
    navigate('edit');
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();

    try {
      await deletePost(postId);
      navigate('/');
    } catch (error) {
      setToast({
        text: error.message,
        type: 'error',
      });
    }
  };

  let actions;

  if (isAuthorSuccess && loggedIn && author.id == userData.id) {
    actions = (
      <div className={s.control}>
        <button className={s.button} onClick={handleEditClick}>
          Edit
        </button>
        <button className={`${s.button} ${s.delete}`} onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    );
  }

  if (isPostLoading) {
    return <Loading>Loading</Loading>;
  } else if (isPostError) {
    return <div>{postError.toString()}</div>;
  }

  return (
    <Container>
      <div className={s.post}>
        <div className={s.header}>
          <h1 className={s.title}>{capitalizeFirstLetter(post.title)}</h1>
          <div className={s.info}>
            <div className={s.postInfo}>
              <div className={s.author}>
                by
                {isAuthorSuccess && (
                  <>
                    <Avatar src={`${process.env.REACT_APP_GET_IMG_BASEURL}${author?.profile_picture}`} ml="5px" mr="5px" />
                    <Text span type="success">
                      {author.login}
                    </Text>
                  </>
                )}
              </div>

              <div className={s.date} title={post.publish_date}>
                {/* {moment(post.publish_date).fromNow()} */}
                {moment(post.publish_date).format('lll')}
              </div>
              {post.status === 'inactive' && (
                <Tag type="warning" scale={0.7} font="14px" ml="15px">
                  Status: Inactive
                </Tag>
              )}
            </div>
            <div className={s.postActions}>{actions}</div>
          </div>
          <Divider />
        </div>

        <div className={s.container}>
          <div className={s.content} dangerouslySetInnerHTML={{ __html: post.content }}>
            {/* <p>
              {capitalizeFirstLetter(post.content)} {capitalizeFirstLetter(post.content)}
            </p> */}
          </div>

          <div className={s.footer}>
            <div className={s.categories}>
              {isCategoriesSuccess &&
                categories.map((item) => (
                  <Tag key={item.id} type="lite" mr="10px">
                    {item.title}
                  </Tag>
                ))}
            </div>
            <Vote postId={post.id} voteCount={post.rating} />
          </div>
        </div>

        <AnswerList postId={postId} />
        <AnswerCreate postId={postId} />
      </div>
    </Container>
  );
};

export default Post;
