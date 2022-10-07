import { Tabs, Text } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Container from '../../shared/Container/Container';
import { selectUser } from '../../store/selectors';
import PostList from './components/PostList';

import s from './Home.module.scss';

const Home = () => {
  const [tab, setTab] = useState('popular');
  const { pageSize } = useSelector(selectUser);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      sort: tab,
      page: 1,
    })
  }, [tab, pageSize])
  
  
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

        <Tabs value={tab} onChange={setTab}>
          <Tabs.Item label="Popular" value="popular">
            <PostList />
          </Tabs.Item>
          <Tabs.Item label="newest" value="newest">
            Between the Web browser and the server, numerous computers and machines relay the HTTP messages.
          </Tabs.Item>
          <Tabs.Item label="oldest" value="oldest">
            Between the Web browser and the server, numerous computers and machines relay the HTTP messages.
          </Tabs.Item>
          <Tabs.Item label="unpopular" value="unpopular">
            Between the Web browser and the server, numerous computers and machines relay the HTTP messages.
          </Tabs.Item>
        </Tabs>
      </div>
    </Container>
  );
};

export default Home;
