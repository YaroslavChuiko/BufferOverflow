import { Divider } from '@geist-ui/core';
import Container from '../../shared/Container/Container';

import ChangeAvatar from './components/ChangeAvatar';
import ChangeData from './components/ChangeData';
import s from './ProfileEdit.module.scss';

const ProfileEdit = () => {
  return (
    <Container>
      <div className={s.header}>
        <h1 className={s.title}>Edit your profile</h1>
        <Divider />
      </div>
      <div className={s.content}>
        <ChangeAvatar />
        <Divider />

        <ChangeData />
      </div>
    </Container>
  );
};

export default ProfileEdit;
