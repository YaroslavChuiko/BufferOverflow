import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetCommentsQuery } from '../../../store/api/commentSlice';
import { selectUser } from '../../../store/selectors';
import Comment from './Comment';
import CommentEditor from './CommentCreate';
import s from './CommentList.module.scss';

const CommentList = ({ answerId }) => {
  const { loggedIn, userData } = useSelector(selectUser);
  const [showComments, setShowComments] = useState(false);

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isSuccess: isCommentsSuccess,
    isError: isCommentsErrod,
    error: commentsError,
  } = useGetCommentsQuery(answerId); //{}

  const handleShowCommentsClick = (e) => {
    e.preventDefault();
    setShowComments((prevVal) => !prevVal);
  };

  let showCommentsBtnText;

  if (showComments) {
    showCommentsBtnText = 'Hide comments';
  } else if (isCommentsSuccess && comments.totalCount == 0) {
    showCommentsBtnText = `Add a comment`;
  } else if (isCommentsSuccess && comments.totalCount == 1) {
    showCommentsBtnText = `Show 1 comment`;
  } else if (isCommentsSuccess && comments.totalCount > 1) {
    showCommentsBtnText = `Show ${comments.totalCount} comments`;
  }

  const showCommentsBtn = (
    <button className={s.button} onClick={handleShowCommentsClick}>
      {showCommentsBtnText}
    </button>
  );

  return (
    <div className={s.commentList}>
      <div className={s.control}>{showCommentsBtn}</div>
      {showComments && (
        <div className={s.comments}>
          {isCommentsSuccess && comments.totalCount > 0 && (
            <div className={s.content}>
              {comments.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          )}
          <div className={s.addComment}>
            {loggedIn ? (
              <CommentEditor answerId={answerId} />
            ) : (
              <div className={s.notLoggedIn}>
                <Link to={'/login'}>Login</Link>
                <span>to leave a comment</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentList;
