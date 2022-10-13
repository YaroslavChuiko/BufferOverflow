import { Card, Divider, Loading } from '@geist-ui/core';
import React from 'react';
import { useGetPostCommentsQuery } from '../../../store/api/apiSlice';
import s from './Answers.module.scss';

const Answers = ({ postId }) => {
  // comments?_end=25&_order=DESC&_sort=id&_start=0&post_id=3,
  const param = new URLSearchParams();
  param.append('_start', String(0));
  param.append('_end', String(10));
  param.append('_order', 'DESC');
  param.append('_sort', 'rating');
  param.append('post_id', postId);

  const {
    data,
    isLoading: isCommentsLoading,
    isSuccess: isCommentsSuccess,
    isError: isCommentsError,
    error: commentsError,
  } = useGetPostCommentsQuery(`?${param.toString()}`);

  if (isCommentsSuccess) {
    console.log('data', data);
  }

  let content;
  if (isCommentsLoading) {
    content = <Loading>Loading</Loading>;
  } else if (isCommentsSuccess) {
    content = data.comments.map((comment, index) => <Card key={index}>{comment.content}</Card>);
  } else if (isCommentsError) {
    content = <div>{postError.toString()}</div>;
  }

  return (
    <div className={s.answers}>
      <div className={s.answersHeader}>
        <h3 className={s.answersTitle}>
          {isCommentsSuccess && data.totalCount} {isCommentsSuccess && data.totalCount > 1 ? 'Answers' : 'Answer'}
        </h3>
        <Divider />
      </div>
      <div className={s.answersContent}>

      {content}
      </div>
    </div>
  );
};

export default Answers;
