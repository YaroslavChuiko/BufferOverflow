import { Avatar, Card, Tag, Text } from '@geist-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useGetPostAuthorQuery, useGetPostCategoriesQuery } from '../../store/api/apiSlice';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import Vote from '../Vote/Vote';
import s from './PostPreview.module.scss';

const PostPreview = ({ post }) => {
  const params = new URLSearchParams();
  post.post_categories.forEach((value) => params.append('id', value));

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isSuccess: isCategoriesSuccess,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetPostCategoriesQuery(`?${params.toString()}`);

  const {
    data: author,
    isLoading: isAuthorLoading,
    isSuccess: isAuthorSuccess,
    isError: isAuthorErrod,
    error: authorError,
  } = useGetPostAuthorQuery(post.author_id);

  return (
    <Card mb="10px">
      <h3 className={s.title}>
        <Link className={s.titleLink} to={`/post/${post.id}`}>
          {capitalizeFirstLetter(post.title)}
        </Link>
      </h3>
      <p>{post.content}</p>
      <div className={s.categories}>
        {isCategoriesSuccess &&
          categories.map((item) => (
            <Tag key={item.id} type="lite" mr="10px">
              {item.title}
            </Tag>
          ))}
      </div>
      <div className={s.footer}>
        <div className={s.info}>
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
            {moment(post.publish_date).fromNow()}
          </div>
        </div>
        <div className={s.rating}>
          <Vote postId={post.id} voteCount={post.rating} />
        </div>
      </div>
    </Card>
  );
};

export default PostPreview;
