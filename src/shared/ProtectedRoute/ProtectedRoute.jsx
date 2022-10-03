import { Text } from '@geist-ui/core';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { selectUser } from '../../store/selectors';
import Container from '../Container/Container';

import s from './ProtectedRoute.module.scss';

const ProtectedRoute = () => {
  const { loggedIn } = useSelector(selectUser);

  if (!loggedIn) {
    return (
      <Container>
        <div className={s.unauthorized}>
          <Text h1>Unauthorized :(</Text>
          <span>
            <Link to="/login">Login</Link> to gain access
          </span>
        </div>
      </Container>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
