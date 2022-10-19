import { Text } from '@geist-ui/core';
import moment from 'moment';
import { useGetAuthorQuery } from '../../../store/api/apiSlice';
import s from './Comment.module.scss';

const Comment = ({ comment }) => {
  const {
    data: author,
    isLoading: isAuthorLoading,
    isSuccess: isAuthorSuccess,
    isError: isAuthorErrod,
    error: authorError,
  } = useGetAuthorQuery(comment.author_id);

  return (
    <div className={s.comment}>
      <span>{comment.content}</span>
      {isAuthorSuccess && (
        <div className={s.author}>
          -&nbsp;
          <Text span type="success" title={`rating: ${author.rating}`}>
            {author.login}
          </Text>
        </div>
      )}
      <span className={s.date} title={comment.publish_date}>
        {moment(comment.publish_date).format('lll')}
      </span>
    </div>
  );
};

export default Comment;
