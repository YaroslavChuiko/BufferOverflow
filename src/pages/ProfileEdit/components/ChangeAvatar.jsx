import { Button, useToasts } from '@geist-ui/core';
import { Image } from '@geist-ui/icons';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserAvatarMutation } from '../../../store/api/apiSlice';
import { selectUser } from '../../../store/selectors';
import { userSlice } from '../../../store/slices/userSlice';

import s from './ChangeAvatar.module.scss';

const ChangeAvatar = () => {
  const { userData } = useSelector(selectUser);
  const dispatch = useDispatch();
  const { setToast } = useToasts();
  const inputFile = useRef();

  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [updateUserAvatar, { isLoading, isSuccess }] = useUpdateUserAvatarMutation();

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadToServer = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append('avatar', avatar);
    try {
      const response = await updateUserAvatar(body).unwrap();
      dispatch(userSlice.actions.setUser(response.user));
      setAvatar(null);
    } catch (error) {
      setToast({
        text: error.message,
        type: 'error',
      });
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setAvatar(null);
  };

  return (
    <form className={s.formAvatar} encType="multipart/form-data" onSubmit={uploadToServer}>
      <div className={s.label}>Profile picture</div>
      <div className={s.avatar} onClick={() => inputFile.current.click()}>
        <a className={s.changeImgBtn}>
          <Image />
          <span>Change picture</span>
        </a>
        <img className={s.avatarImg} src={`${process.env.REACT_APP_API_URL}images/${userData.avatar}`} alt="avatar" />
      </div>
      <input id="avatar" name="avatar" type="file" accept=".png, .jpg, .jpeg" ref={inputFile} onChange={uploadToClient} />

      {avatar && (
        <>
          <div className={s.preview}>
            <div className={s.label}>Preview</div>
            <div className={s.avatar}>
              <img className={s.avatarImg} src={previewUrl} alt="avatar" />
            </div>
          </div>

          <div className={s.actions}>
            <Button loading={isLoading} htmlType="submit" type="success-light" mr="15px" mb="10px">
              Save
            </Button>
            <Button type="error-light" ghost onClick={handleCancelClick} mb="10px">
              Cancel
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default ChangeAvatar;
