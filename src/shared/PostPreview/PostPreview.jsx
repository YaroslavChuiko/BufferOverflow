import { Avatar, Card, Tag, Text } from '@geist-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useGetAuthorQuery } from '../../store/api/apiSlice';
import { useGetPostCategoriesQuery } from '../../store/api/postSlice';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import getText from '../../utils/getText';
import truncate from '../../utils/truncate';
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
  } = useGetAuthorQuery(post.author_id);

  return (
    <Card mb="10px">
      <div className={s.postPreview}>
        <h3 className={s.title}>
          <Link className={s.titleLink} to={`/post/${post.id}`}>
            {capitalizeFirstLetter(post.title)}
          </Link>
        </h3>
        <p>{truncate(getText(post.content), 250)}</p>
        <div className={s.categories}>
          {isCategoriesSuccess &&
            categories.map((item) => (
              <Tag key={item.id} type="lite" mr="10px">
                {item.title}
              </Tag>
            ))}
        </div>
        <div className={s.footer}>
          <div className={s.footerLeft}>
            <div className={s.author}>
              by
              {isAuthorSuccess && (
                <>
                  <Avatar src={`${process.env.REACT_APP_GET_IMG_BASEURL}${author?.profile_picture}`} ml="5px" mr="5px" />
                  <Text span type="success" title={`rating: ${author.rating}`}>
                    {author.login}
                  </Text>
                </>
              )}
            </div>

            <div className={s.date} title={post.publish_date}>
              {moment(post.publish_date).fromNow()}
            </div>
          </div>
          <div className={s.footerRight}>
            {post.status === 'inactive' && (
              <Tag type="warning" scale={0.7} font="14px" mr="15px">
                Status: Inactive
              </Tag>
            )}
            <Vote postId={post.id} voteCount={post.rating} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostPreview;
