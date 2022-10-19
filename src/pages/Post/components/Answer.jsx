import { Avatar, Card, Text } from '@geist-ui/core';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Vote from '../../../shared/Vote/Vote';
import { useDeleteAnswerMutation, useGetAnswerCommentsQuery, useGetAuthorQuery } from '../../../store/api/apiSlice';
import { selectUser } from '../../../store/selectors';

import s from './Answer.module.scss';

const Answer = ({ answer }) => {
  const { loggedIn, userData } = useSelector(selectUser);

  const {
    data: author,
    isLoading: isAuthorLoading,
    isSuccess: isAuthorSuccess,
    isError: isAuthorErrod,
    error: authorError,
  } = useGetAuthorQuery(answer.author_id);

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isSuccess: isCommentsSuccess,
    isError: isCommentsErrod,
    error: commentsError,
  } = useGetAnswerCommentsQuery(answer.id);

  const [deleteAnswer, { isLoading, isSuccess }] = useDeleteAnswerMutation();

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    await deleteAnswer(answer.id);
  };

  let postControl;

  if (isAuthorSuccess && loggedIn && author.id == userData.id) {
    postControl = (
      <div className={s.controlPost}>
        <button className={s.button}>Edit</button>
        <button className={`${s.button} ${s.delete}`} onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    );
  }

  return (
    <Card mb="20px">
      <div className={s.header}>
        <div className={s.info}>
          <div className={s.infoAuthor}>
            {isAuthorSuccess && (
              <>
                <Avatar src={`${process.env.REACT_APP_GET_IMG_BASEURL}${author?.profile_picture}`} mr="10px" scale={1.5} />
                <Text span type="success">
                  {author.login}
                </Text>
              </>
            )}
          </div>

          <div className={s.infoDate} title={answer.publish_date}>
            {moment(answer.publish_date).format('lll')}
          </div>
        </div>
        <Vote answerId={answer.id} voteCount={answer.rating} />
      </div>

      <div className={s.content} dangerouslySetInnerHTML={{ __html: answer.content }}></div>

      <div className={s.footer}>
        <div className={s.control}>
          <div className={s.controlComments}>
            {isCommentsSuccess && comments.totalCount > 0 && (
              <button className={s.button}>Show {comments.totalCount} comments</button>
            )}
          </div>

          {postControl}
        </div>

        {/* <div className={s.comments}></div> */}
      </div>
    </Card>
  );
};

export default Answer;
