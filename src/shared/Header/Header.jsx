import { Avatar, Button } from '@geist-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
      <Container>
        <div className={s.content}>
          <div className={s.logo}>
            <Link to={'/'}>Logo</Link>
          </div>
          <nav className={s.nav}>
            <NavLink to="/" className={({ isActive }) => (isActive ? `${s.navLink} ${s.active}` : s.navLink)} end>
              Home
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? `${s.navLink} ${s.active}` : s.navLink)}>
              Profile
            </NavLink>
            <NavLink to="/questions" className={({ isActive }) => (isActive ? `${s.navLink} ${s.active}` : s.navLink)}>
              Questions
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

          {/* //! add color default */}
          {/* <div className={s.user}>
            <Link to={'/profile'}> 
              <Avatar scale={1.5} src={`${process.env.REACT_APP_API_URL}images/defaultAvatar/defaultAvatar.jpg`} text="YC" />
            </Link>
            <div className={s.userInfo}>
              <span className={s.userName}>ychuiko</span>
              <span className={s.userRole}>user</span>
            </div>
          </div> */}
          {/* <Button scale={0.8} auto type='secondary' onClick={() => {navigate("/login")}}>Sign in</Button> */}

          {/* <User src={`${process.env.REACT_APP_API_URL}images/defaultAvatar/defaultAvatar.jpg`} name="ychuiko">
            user
          </User> */}
        </div>
      </Container>
    </header>
  );
};

export default Header;
