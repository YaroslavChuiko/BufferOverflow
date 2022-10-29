import { AutoComplete, Tabs, Text } from '@geist-ui/core';
import { useState } from 'react';
import Container from '../../shared/Container/Container';
import PostList from '../../shared/PostList/PostList';
import { useLazyGetCategoriesQuery } from '../../store/api/apiSlice';

import s from './Questions.module.scss';

const Questions = () => {
  const tabs = ['popular', 'unpopular', 'newest', 'oldest'];
  const tabQuery = {
    'popular': {
      '_order': 'DESC',
      '_sort': 'rating',
      'status': 'active',
    },
    'unpopular': {
      '_order': 'ASC',
      '_sort': 'rating',
      'status': 'active',
    },
    'newest': {
      '_order': 'DESC',
      '_sort': 'publish_date',
      'status': 'active',
    },
    'oldest': {
      '_order': 'ASC',
      '_sort': 'publish_date',
      'status': 'active',
    },
  };

  const [tab, setTab] = useState(JSON.parse(sessionStorage.getItem('questionsActiveTab')) || tabs[0]);

  const handleTabChange = (val) => {
    sessionStorage.setItem('questionsActiveTab', JSON.stringify(val));
    setTab(val);
  };

  //filter //! add many tags
  const [filter, setFilter] = useState('');
  const [getCategories, { data, isFetching }] = useLazyGetCategoriesQuery();

  const searchHandler = async (currentValue) => {
    if (!currentValue) return setFilter('');
    await getCategories(currentValue);
  };

  const handleSelect = (val) => {
    const category = data.find((item) => item.value === val);
    setFilter(category.id);
  };

  return (
    <Container>
      <div className={s.container}>
        <div>
          <Text h1 font="36px">
            Questions
          </Text>
          <p>Ask a question and get a quick answer.</p>
        </div>

        <div className={s.questions}>
          <div className={s.questioinsContent}>
            <Tabs value={tab} onChange={handleTabChange}>
              {tabs.map((tabName, index) => (
                <Tabs.Item key={index} label={tabName} value={tabName}>
                  <PostList params={tabQuery[tabName]} filter={filter} />
                </Tabs.Item>
              ))}
            </Tabs>
          </div>
          <div className={s.questionsFilter}>
            <h4>Filter by tags</h4>
            <AutoComplete
              searching={isFetching}
              options={data || []}
              onSearch={searchHandler}
              onSelect={handleSelect}
              placeholder="Enter here"
              w="100%"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Questions;
