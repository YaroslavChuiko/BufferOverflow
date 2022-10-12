import { AutoComplete, Select, Tabs, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Container from '../../shared/Container/Container';
import { useGetCategoriesQuery, useLazyGetCategoriesQuery } from '../../store/api/apiSlice';
import { selectUser } from '../../store/selectors';
import PostList from './components/PostList';

import s from './Home.module.scss';

const Home = () => {
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

  //! create component Questions || Posts

  const [tab, setTab] = useState(JSON.parse(sessionStorage.getItem('questionsActiveTab')) || tabs[0]);
  const { pageSize } = useSelector(selectUser);
  // let [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   setSearchParams({
  //     sort: tab,
  //     page: 1,
  //   });
  // }, [tab, pageSize]);

  const handleTabChange = (val) => {
    sessionStorage.setItem('questionsActiveTab', JSON.stringify(val));
    setTab(val);
  };

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
      <div className={s.home}>
        <div>
          {/* <Description title="Questions" content="Data about this section." /> */}
          <Text h1 font="36px">
            Questions
          </Text>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, praesentium.</p>
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

            {/* <Select
              placeholder="Tags"
              multiple
              pure={true}
              w="100%"
              initialValue={['1', '3', '4', '6']}
              onClick={(e) => {
                e.preventDefault();
              }}
              type="secondary"
            >
              <Select.Option value="1">React</Select.Option>
              <Select.Option value="2">Angular</Select.Option>
              <Select.Option value="3">Vue</Select.Option>
              <Select.Option divider />
              <Select.Option value="4">Rails</Select.Option>
              <Select.Option value="5">Sinatra</Select.Option>
              <Select.Option divider />
              <Select.Option value="6">Express</Select.Option>
              <Select.Option value="7">Koa</Select.Option>
            </Select> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
