import { Avatar, Button } from '@geist-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo128 from '../../assets/logo/logo128.png';
import { selectUser } from '../../store/selectors';
import { logOut } from '../../store/thunks/userThunk';
import Container from '../Container/Container';

import s from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, userData } = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <header className={s.header}>
      <Container forMainContent={false}>
        <div className={s.content}>
          <Link className={s.logo} to={'/'}>
            <img className={s.logoImg} src={logo128} alt="logo" />
            <span className={s.logoText}>
              <span>Buffer</span>Overflow
            </span>
          </Link>
          <nav className={s.nav}>
            <NavLink to="/" className={handleIsNavLinkActive} end>
              Questions
            </NavLink>
            <NavLink to="/profile" className={handleIsNavLinkActive}>
              Profile
            </NavLink>
            <NavLink to="/post/create" className={handleIsNavLinkActive}>
              Ask question
            </NavLink>
          </nav>

          {loggedIn ? (
            <div className={s.controls}>
              <div className={s.user}>
                <Link to={'/profile'}>
                  <Avatar scale={1.8} src={`${process.env.REACT_APP_API_URL}images/${userData.avatar}`} text="YC" />
                </Link>
                <div className={s.userInfo}>
                  <span className={s.userName}>{userData.login}</span>
                  <span className={s.userRole}>{userData.role}</span>
                </div>
              </div>
              <Button
                scale={0.8}
                auto
                type="secondary"
                onClick={() => {
                  dispatch(logOut());
                }}
              >
                Log out
              </Button>
            </div>
          ) : (
            <Button
              scale={0.8}
              auto
              type="secondary"
              onClick={() => {
                navigate('/login');
              }}
            >
              Log in
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
