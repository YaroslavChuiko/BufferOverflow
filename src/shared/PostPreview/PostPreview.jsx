import { Avatar, Card, Tag } from '@geist-ui/core';
import React, { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { useGetPostAuthorQuery, useGetPostCategoriesQuery } from '../../store/api/apiSlice';

import s from './PostPreview.module.scss';

const PostPreview = ({ post }) => {
  // const [author, setAuthor] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [likes, setlikes] = useState([]);

  const params = new URLSearchParams();
  post.post_categories.forEach((value) => params.append('id', value));
  const {
    data: categories,
    isCategoriesLoading,
    isCategoriesSuccess,
    isCategoriesError,
    categoriesError,
  } = useGetPostCategoriesQuery(`?${params.toString()}`);

  const {
    data: author,
    isLoading: isAuthorLoading,
    isSuccess: isAuthorSuccess,
    isError: isAuthorErrod,
    error: authorError,
  } = useGetPostAuthorQuery(post.author_id);

  //! get user insode post or separete query (categories)
  //! get all post alikes or only one
  // useEffect(() => {
  //   Promise.all([getPostAuthor(), getPostCategories(), getPostLikes()]).then(function (results) {
  //     // const author = results[0].data;
  //     setAuthor(results[0].data);
  //     // const categories = results[1].data;
  //     setCategories(results[1].data);
  //     const likes = results[2].data;
  //     console.log('author', author);
  //     console.log('categories', categories);
  //     console.log('likes', likes);
  //   });
  // }, []);

  // const getPostAuthor = () => {
  //   return api.get(`users/${post.author_id}`);
  // };

  // const getPostCategories = () => {
  //   const params = new URLSearchParams();
  //   post.post_categories_id.forEach((value) => params.append('id', value));
  //   console.log(params.toString());

  //   return api.get(`categories?${params.toString()}`);
  // };

  // const getPostLikes = () => {
  //   return api.get(`likes?target_post=${post.id}`);
  // };

  // console.log(author);

  return (
    <Card mb="10px">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div>
        {isCategoriesSuccess &&
          categories.map((item) => (
            <Tag key={item.id} type="lite" mr="10px">
              {item.title}
            </Tag>
          ))}
      </div>
      <div>
        by
        {isAuthorSuccess && (
          <>
            <Avatar src={`${process.env.REACT_APP_GET_IMG_BASEURL}${author?.profile_picture}`} ml="5px" mr="5px" />
            <span>{author.login}</span>
          </>
        )}
        <span> about {post.publish_date} ago</span>
        <span> rating: {post.rating}</span>
      </div>
    </Card>
  );
};

export default PostPreview;
