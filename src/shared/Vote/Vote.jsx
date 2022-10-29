import { Tooltip, useClasses } from '@geist-ui/core';
import { ChevronDown, ChevronUp } from '@geist-ui/icons';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useAddLikeMutation,
  useDeleteLikeMutation,
  useLazyCheckLikeQuery,
  useUpdateLikeMutation,
} from '../../store/api/likeSlice';
import { selectUser } from '../../store/selectors';
import s from './Vote.module.scss';

const Vote = ({ postId = null, answerId = null, voteCount }) => {
  const { loggedIn, userData } = useSelector(selectUser);

  const target = postId ? 'posts' : 'answers';
  const id = postId || answerId;

  const [checkLike, { data: like, isLoading: isCheckLikeLoading, isSuccess: isCheckLikeSuccess }] = useLazyCheckLikeQuery();

  useEffect(() => {
    if (loggedIn) {
      checkLike({ target, id });
    }
  }, []);

  const [addLike, { isLoading: isAddLikeLoading, isSuccess: isAddLikeSuccess }] = useAddLikeMutation();
  const [updateLike, { isLoading: isUpdateLikeLoading, isSuccess: isUpdateLikeSuccess }] = useUpdateLikeMutation();
  const [deleteLike, { isLoading: isDeleteLikeLoading, isSuccess: isDeleteLikeSuccess }] = useDeleteLikeMutation();

  const handlePositiveVote = async (e) => {
    e.preventDefault();

    if (!loggedIn || !isCheckLikeSuccess) {
      return;
    }

    const likeInfo = {
      author_id: userData.id,
      target_post: postId,
      target_answer: answerId,
      type: 'like',
    };

    switch (like?.type) {
      case 'like':
        await deleteLike(likeInfo).unwrap();
        checkLike({ target, id });
        break;

      case 'dislike':
        await updateLike(likeInfo).unwrap();
        checkLike({ target, id });
        break;

      default:
        await addLike(likeInfo).unwrap();
        checkLike({ target, id });
        break;
    }
  };

  const handleNegativeVote = async (e) => {
    e.preventDefault();

    if (!loggedIn || !isCheckLikeSuccess) {
      return;
    }

    const likeInfo = {
      author_id: userData.id,
      target_post: postId,
      target_answer: answerId,
      type: 'dislike',
    };
    
      switch (like?.type) {
        case 'dislike':
          await deleteLike(likeInfo).unwrap();
          checkLike({ target, id });
          break;

        case 'like':
          await updateLike(likeInfo).unwrap();
          checkLike({ target, id });
          break;

        default:
          await addLike(likeInfo).unwrap();
          checkLike({ target, id });
          break;
      }
  };

  const countClassName = useClasses(s.voteCount, voteCount >= 0 ? s.positive : s.negative);
  const negativeVoteClassName = useClasses(s.voteButton, like?.type === 'dislike' && loggedIn ? s.negative : '');
  const positiveVoteClassName = useClasses(s.voteButton, like?.type === 'like' && loggedIn ? s.positive : '');

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
