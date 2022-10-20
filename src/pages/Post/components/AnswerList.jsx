import { Divider, Loading, Select } from '@geist-ui/core';
import { useState } from 'react';
import { useGetAnswersQuery } from '../../../store/api/answerSlice';
import Answer from './Answer';
import s from './AnswerList.module.scss';

const AnswerList = ({ postId }) => {
  const selectOptions = [
    { label: 'Highest score', value: 'highestScore' },
    { label: 'Newest', value: 'newest' },
  ];
  const sortingOptions = {
    'highestScore': {
      '_order': 'DESC',
      '_sort': 'rating',
      'status': 'active',
    },
    'newest': {
      '_order': 'DESC',
      '_sort': 'publish_date',
      'status': 'active',
    },
  };

  const [sortedBy, setSortedBy] = useState(JSON.parse(sessionStorage.getItem('answersSortedBy')) || selectOptions[0].value);

  const handleSortedByChange = (val) => {
    sessionStorage.setItem('answersSortedBy', JSON.stringify(val));
    setSortedBy(val);
  };

  const param = new URLSearchParams();
  param.append('_start', String(0));
  param.append('_end', String(10));
  param.append('post_id', postId);

  for (const key in sortingOptions[sortedBy]) {
    param.append(key, sortingOptions[sortedBy][key]);
  }

  const {
    data,
    isLoading: isAnswersLoading,
    isSuccess: isAnswersSuccess,
    isError: isAnswersError,
    error: answersError,
  } = useGetAnswersQuery(`?${param.toString()}`);

  let content;
  if (isAnswersLoading) {
    content = <Loading>Loading</Loading>;
  } else if (isAnswersSuccess) {
    content = data.answers.map((answer) => <Answer key={answer.id} answer={answer} />);
  } else if (isAnswersError) {
    content = <div>{postError.toString()}</div>;
  }

  return (
    <div className={s.answers}>
      <div className={s.header}>
        <div className={s.headerContent}>
          <h3 className={s.headerTitle}>
            {isAnswersSuccess && data.totalCount} {isAnswersSuccess && data.totalCount > 1 ? 'Answers' : 'Answer'}
          </h3>

          <div className={s.sortedBy}>
            <span className={s.sortedByLabel}>Sorted by:</span>
            <Select placeholder={'Sort by'} value={sortedBy} onChange={handleSortedByChange}>
              {selectOptions.map((item, index) => (
                <Select.Option key={index} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <Divider />
      </div>
      <div className={s.answersContent}>{content}</div>
    </div>
  );
};

export default AnswerList;
