import { Tabs, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Container from '../../shared/Container/Container';
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

  const [tab, setTab] = useState(JSON.parse(sessionStorage.getItem('questionsActiveTab')) || tabs[0]);
  const { pageSize } = useSelector(selectUser);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      sort: tab,
      page: 1,
    });
  }, [tab, pageSize]);

  const handleTabChange = (val) => {
    sessionStorage.setItem('questionsActiveTab', JSON.stringify(val));
    setTab(val);
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

        <Tabs value={tab} onChange={handleTabChange}>
          {tabs.map((tabName) => (
            <Tabs.Item label={tabName} value={tabName}>
              <PostList params={tabQuery[tabName]} />
            </Tabs.Item>
          ))}
          {/* <Tabs.Item label="Popular" value="popular">
            <PostList params={tabQuery[tab]} />
          </Tabs.Item>
          <Tabs.Item label="newest" value="newest">
            <PostList params={tabQuery[tab]} />
          </Tabs.Item>
          <Tabs.Item label="oldest" value="oldest">
            <PostList params={tabQuery[tab]} />
          </Tabs.Item>
          <Tabs.Item label="unpopular" value="unpopular">
            <PostList params={tabQuery[tab]} />
          </Tabs.Item> */}
        </Tabs>
      </div>
    </Container>
  );
};

export default Home;
