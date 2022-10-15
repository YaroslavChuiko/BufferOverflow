import { Avatar, Card, Text } from '@geist-ui/core';
import moment from 'moment';
import React from 'react';
import { useGetAuthorQuery } from '../../../store/api/apiSlice';
import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import Vote from '../../../shared/Vote/Vote';

import s from './Answer.module.scss';

const Answer = ({ answer }) => {
  const {
    data: author,
    isLoading: isAuthorLoading,
    isSuccess: isAuthorSuccess,
    isError: isAuthorErrod,
    error: authorError,
  } = useGetAuthorQuery(answer.author_id);

  return (
    <Card mb="20px">
      <div className={s.header}>
        <div className={s.answerInfo}>
          <div className={s.author}>
            {isAuthorSuccess && (
              <>
                <Avatar src={`${process.env.REACT_APP_GET_IMG_BASEURL}${author?.profile_picture}`} mr="10px" scale={1.5} />
                <Text span type="success">
                  {author.login}
                </Text>
              </>
            )}
          </div>

          <div className={s.date} title={answer.publish_date}>
            {moment(answer.publish_date).fromNow()}
          </div>
        </div>
        <Vote commentId={answer.id} voteCount={answer.rating} />
      </div>
      <div className={s.content}>{capitalizeFirstLetter(answer.content)}</div>
    </Card>
  );
};

export default Answer;
