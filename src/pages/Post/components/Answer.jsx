import { Avatar, Tag, Text } from '@geist-ui/core';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Vote from '../../../shared/Vote/Vote';
import { useGetAuthorQuery } from '../../../store/api/apiSlice';
import { useDeleteAnswerMutation } from '../../../store/api/answerSlice';
import { selectUser } from '../../../store/selectors';
import AnswerEdit from './AnswerEdit';
import CommentList from './CommentList';

import s from './Answer.module.scss';

const Answer = ({ answer }) => {
  const { loggedIn, userData } = useSelector(selectUser);
  const [isEdit, setIsEdit] = useState(false);

  const {
    data: author,
    isLoading: isAuthorLoading,
    isSuccess: isAuthorSuccess,
    isError: isAuthorErrod,
    error: authorError,
  } = useGetAuthorQuery(answer.author_id);

  const [deleteAnswer, { isLoading, isSuccess }] = useDeleteAnswerMutation();

  const handleEditClick = async (e) => {
    e.preventDefault();
    setIsEdit((prevVal) => !prevVal);
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    await deleteAnswer(answer.id);
  };

  let control;

  if (isAuthorSuccess && loggedIn && author.id == userData.id) {
    control = (
      <div className={s.control}>
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
    <div className={s.container}>
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

          {answer.status === 'inactive' && (
            <Tag type="warning" scale={0.7} font="14px" ml="15px">
              Status: Inactive
            </Tag>
          )}
        </div>
        <Vote answerId={answer.id} voteCount={answer.rating} />
      </div>

      <div className={s.content} dangerouslySetInnerHTML={{ __html: answer.content }}></div>

      <div className={s.footer}>{control}</div>

      {isEdit ? <AnswerEdit answer={answer} setIsEdit={setIsEdit} /> : <CommentList answerId={answer.id} />}
    </div>
  );
};

export default Answer;
