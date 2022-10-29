import { AutoComplete, Button, Tabs, useToasts } from '@geist-ui/core';
import { Settings, UserX } from '@geist-ui/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '../../shared/Container/Container';
import PostList from '../../shared/PostList/PostList';
import { useDeleteUserMutation, useLazyGetCategoriesQuery } from '../../store/api/apiSlice';
import { useLogoutMutation } from '../../store/api/authSlice';
import { selectUser } from '../../store/selectors';

import s from './Profile.module.scss';

const Profile = () => {
  const { userData } = useSelector(selectUser);
  const { setToast } = useToasts();
  const navigate = useNavigate();

  const tabs = ['popular', 'unpopular', 'newest', 'oldest'];
  const tabQuery = {
    'popular': {
      '_order': 'DESC',
      '_sort': 'rating',
      'author_id': userData.id,
    },
    'unpopular': {
      '_order': 'ASC',
      '_sort': 'rating',
      'author_id': userData.id,
    },
    'newest': {
      '_order': 'DESC',
      '_sort': 'publish_date',
      'author_id': userData.id,
    },
    'oldest': {
      '_order': 'ASC',
      '_sort': 'publish_date',
      'author_id': userData.id,
    },
  };

  const [deleteUser, { isLoading: isLoading, isSuccess: isSuccess }] = useDeleteUserMutation();
  const [logout] = useLogoutMutation();

  const [tab, setTab] = useState(JSON.parse(sessionStorage.getItem('ownQuestionsActiveTab')) || tabs[0]);
  const handleTabChange = (val) => {
    sessionStorage.setItem('ownQuestionsActiveTab', JSON.stringify(val));
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

  const handleEditClick = (e) => {
    e.preventDefault();
    navigate('edit');
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();

    try {
      await deleteUser(userData.id);
      await logout();
      navigate('/');
    } catch (error) {
      setToast({
        text: error.message,
        type: 'error',
      });
    }
  };

  return (
    <Container>
      <div className={s.profile}>
        <div className={s.user}>
          <div className={s.avatar}>
            <img className={s.avatarImg} src={`${process.env.REACT_APP_API_URL}images/${userData.avatar}`} alt="avatar" />
          </div>
          <div className={s.info}>
            <h2 className={s.fullName}>{userData.fullName}</h2>
            <div className={s.login}>
              <span className={s.label}>Login:</span>
              {userData.login}
            </div>
            <div className={s.email}>
              <span className={s.label}>Email:</span>
              {userData.email}
            </div>
            <div className={s.rating}>
              <span className={s.label}>rating:</span>
              <span className={userData.rating >= 0 ? s.positive : s.negative}>{userData.rating}</span>
            </div>
          </div>
        </div>

        <div className={s.actions}>
          <Button icon={<Settings />} onClick={handleEditClick} type="success-light" mb="15px">
            Edit profile
          </Button>
          <Button loading={isLoading} onClick={handleDeleteClick} icon={<UserX />} type="error" ghost>
            delete profile
          </Button>
        </div>
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
    </Container>
  );
};

export default Profile;
