import { Button, Loading } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import PostPreview from '../PostPreview/PostPreview';
import SelectPageSize from '../SelectPageSize/SelectPageSize';
import { useGetPostsQuery } from '../../store/api/postSlice';
import { selectUser } from '../../store/selectors';

import s from './PostList.module.scss';

const PostList = ({ params, filter }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { pageSize } = useSelector(selectUser);

  useEffect(() => {
    // const page = +searchParams.get('page');
    // setSearchParams((prev) => ({ sort: prev.get('sort'), page: page }));
    setPage(1);
  }, [pageSize]);

  const param = new URLSearchParams();
  param.append('_start', String(pageSize * page - pageSize));
  param.append('_end', String(pageSize * page));

  if (filter) {
    param.append('post_categories', filter);
  }
  
  for (const key in params) {
    param.append(key, params[key]);
  }
  const { data, isLoading, isFetching, isSuccess, isError, error } = useGetPostsQuery(`?${param.toString()}`);

  const handlePageChange = (val) => {
    setPage(val);
  };

  if (isLoading) {
    return <Loading>Loading</Loading>;
  } else if (isError) {
    return <div>{error.toString()}</div>;
  }

  return (
    <div className={s.postList}>
      <div className={s.container}>
        {data?.totalCount ? (
          data?.posts.map((post) => <PostPreview key={post.id} post={post} />)
        ) : (
          <div className={s.noResult}>
            <div className={s.text}>No results found :(</div>
            <Button type="success-light" onClick={(e) => navigate('/post/create')}>Ask question</Button>
          </div>
        )}
      </div>
      <div className={s.pageControls}>
        <Pagination count={Math.ceil(data.totalCount / pageSize)} limit={5} page={page} onChange={handlePageChange} />
        <SelectPageSize />
      </div>
    </div>
  );
};

export default PostList;
