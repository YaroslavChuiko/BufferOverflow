import { Tag, Text } from '@geist-ui/core';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAuthorQuery } from '../../../store/api/apiSlice';
import { useDeleteCommentMutation } from '../../../store/api/commentSlice';
import { selectUser } from '../../../store/selectors';
import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import s from './Comment.module.scss';
import CommentEdit from './CommentEdit';

const Comment = ({ comment }) => {
  const { loggedIn, userData } = useSelector(selectUser);
  const [isEdit, setIsEdit] = useState(false);

  const {
    data: author,
    isLoading: isAuthorLoading,
    isSuccess: isAuthorSuccess,
    isError: isAuthorErrod,
    error: authorError,
  } = useGetAuthorQuery(comment.author_id);

  const [deleteComment, { isLoading, isSuccess }] = useDeleteCommentMutation();

  const handleEditClick = async (e) => {
    e.preventDefault();
    setIsEdit((prevVal) => !prevVal);
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    await deleteComment(comment.id);
  };

  let actions;

  if (isAuthorSuccess && loggedIn && author.id == userData.id) {
    actions = (
      <div className={s.actions}>
        <button className={s.button} onClick={handleEditClick}>
          {isEdit ? 'Cancel' : 'Edit'}
        </button>
        <button className={`${s.button} ${s.delete}`} onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    );
  }

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
      {comment.status === 'inactive' && (
        <Tag type="warning" scale={0.7} font="14px" mr="15px">
          Status: {capitalizeFirstLetter(comment.status)}
        </Tag>
      )}
      {actions}

      {isEdit && <CommentEdit comment={comment} setIsEdit={setIsEdit} />}
    </div>
  );
};

export default Comment;
