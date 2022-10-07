import { Button, ButtonGroup, Card, Loading } from '@geist-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../../lib/axios';
import Pagination from '../../../shared/Pagination/Pagination';
import PostPreview from '../../../shared/PostPreview/PostPreview';
import SelectPageSize from '../../../shared/SelectPageSize/SelectPageSize';
import { useGetPostsQuery } from '../../../store/api/apiSlice';
import { selectUser } from '../../../store/selectors';
import { useSearchParams } from 'react-router-dom';
// import { usePagination } from "react-use-pagination";

import s from './PostList.module.scss';

const PostList = ({}) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(+searchParams.get('page') || 1); //! add page number as page query param
  const { pageSize } = useSelector(selectUser);

  const param = new URLSearchParams();
  param.append('_start', String(pageSize * page - pageSize));
  param.append('_end', String(pageSize * page));
  param.append('_order', 'DESC');
  param.append('_sort', 'rating');

  const { data, isLoading, isFetching, isSuccess, isError, error } = useGetPostsQuery(`?${param.toString()}`);

  // useEffect(() => {
  //   api.get('posts?_order=DESC&_sort=rating')
  //   .then(response => {
  //     console.log('X-Total-Count', response.headers['x-total-count']);
  //     setPosts(response.data)
  //   })
  // }, [])

  const handlePageChange = (val) => {
    // searchParams.get('sort')
    setSearchParams((prev) => ({ sort: prev.get('sort'), page: val }));
    setPage(val);
  };
  // console.log(data);

  // let content;

  if (isLoading) {
    return <Loading>Loading</Loading>;
  } else if (isError) {
    return <div>{error.toString()}</div>;
  }

  return (
    <div className={s.postList}>
      <div className={s.container}>
        {data?.posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
      <div className={s.pageControls}>
        <Pagination count={Math.ceil(data.totalCount / pageSize)} limit={5} page={page} onChange={handlePageChange} />
        <SelectPageSize />
      </div>
    </div>
  );
};

export default PostList;
