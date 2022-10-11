import { Tooltip, useClasses } from '@geist-ui/core';
import { ChevronDown, ChevronUp } from '@geist-ui/icons';
import { useSelector } from 'react-redux';
import { useCheckPostLikeQuery } from '../../store/api/apiSlice';
import { useAddLikeMutation, useDeleteLikeMutation, useUpdateLikeMutation } from '../../store/api/likeSlice';
import { selectUser } from '../../store/selectors';
import s from './Vote.module.scss';

const Vote = ({ postId = null, commentId = null, voteCount }) => {
  const { loggedIn, userData } = useSelector(selectUser);

  const {
    data: like,
    isLoading: isLikeLoading,
    isSuccess: isLikeSuccess,
    isError: isLikeErrod,
    error: likeError,
    refetch: likeRefetch,
  } = useCheckPostLikeQuery(postId);

  const [addLike, { isLoading: isAddLikeLoading, isSuccess: isAddLikeSuccess }] = useAddLikeMutation();
  const [updateLike, { isLoading: isUpdateLikeLoading, isSuccess: isUpdateLikeSuccess }] = useUpdateLikeMutation();
  const [deleteLike, { isLoading: isDeleteLikeLoading, isSuccess: isDeleteLikeSuccess }] = useDeleteLikeMutation();

  const handlePositiveVote = async (e) => {
    e.preventDefault();

    if (!loggedIn || !isLikeSuccess) {
      return;
    }

    const likeInfo = {
      author_id: userData.id,
      target_post: postId,
      terget_comment: commentId,
      type: 'like',
    };

    switch (like?.type) {
      case 'like':
        await deleteLike(likeInfo).unwrap();
        likeRefetch();
        break;

      case 'dislike':
        await updateLike(likeInfo).unwrap();
        likeRefetch();
        break;

      default:
        await addLike(likeInfo).unwrap();
        likeRefetch();
        break;
    }
  };

  const handleNegativeVote = async (e) => {
    e.preventDefault();

    if (!loggedIn || !isLikeSuccess) {
      return;
    }

    const likeInfo = {
      author_id: userData.id,
      target_post: postId,
      terget_comment: commentId,
      type: 'dislike',
    };

    switch (like?.type) {
      case 'dislike':
        await deleteLike(likeInfo).unwrap();
        likeRefetch();
        break;

      case 'like':
        await updateLike(likeInfo).unwrap();
        likeRefetch();
        break;

      default:
        await addLike(likeInfo).unwrap();
        likeRefetch();
        break;
    }
  };

  const countClassName = useClasses(s.voteCount, voteCount >= 0 ? s.positive : s.negative);
  const negativeVoteClassName = useClasses(s.voteButton, like?.type === 'dislike' ? s.negative : '');
  const positiveVoteClassName = useClasses(s.voteButton, like?.type === 'like' ? s.positive : '');

  const negativeVoteButton = (
    <button className={negativeVoteClassName} onClick={handleNegativeVote}>
      <ChevronDown />
    </button>
  );

  const positiveVoteButton = (
    <button className={positiveVoteClassName} onClick={handlePositiveVote}>
      <ChevronUp />
    </button>
  );

  return (
    <div className={s.vote}>
      {loggedIn ? (
        negativeVoteButton
      ) : (
        <Tooltip text={'Please, log in'} type="dark" trigger="click" scale={0.7}>
          {negativeVoteButton}
        </Tooltip>
      )}
      <div className={countClassName}>{voteCount}</div>
      {loggedIn ? (
        positiveVoteButton
      ) : (
        <Tooltip text={'Please, log in'} type="dark" trigger="click" scale={0.7}>
          {positiveVoteButton}
        </Tooltip>
      )}
    </div>
  );
};

export default Vote;
