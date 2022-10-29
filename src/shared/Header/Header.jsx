import { Avatar, Button, useClasses } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo128 from '../../assets/logo/logo128.png';
import { useLogoutMutation } from '../../store/api/authSlice';
import { selectUser } from '../../store/selectors';
import Container from '../Container/Container';

import s from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, userData } = useSelector(selectUser);

  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    await logout();
  };

  const handleMobileMenuToggleClick = (e) => {
    e.preventDefault();
    setIsMobileMenuActive((prevVal) => !prevVal);
  };

  const handleResize = () => {
    if (window.innerWidth <= 767) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  const navToggleClassName = useClasses(s.navToggle, isMobileMenuActive ? s.active : null);
  const handleIsNavLinkActive = ({ isActive }) => (isActive ? `${s.navLink} ${s.active}` : s.navLink);

  const logoutBtn = (
    <Button scale={0.8} auto type="secondary" loading={isLoading} onClick={handleLogoutClick} mt={isMobile ? '20px' : '0'}>
      Log out
    </Button>
  );

  const nav = (
    <nav className={s.nav} onClick={handleMobileMenuToggleClick}>
      <NavLink to="/" className={handleIsNavLinkActive} end>
        Questions
      </NavLink>
      <NavLink to="/profile" className={handleIsNavLinkActive}>
        Profile
      </NavLink>
      <NavLink to="/post/create" className={handleIsNavLinkActive}>
        Ask question
      </NavLink>
      {loggedIn && isMobile && logoutBtn}
    </nav>
  );

  return (
    <header className={s.header}>
      <Container forMainContent={false}>
        <div className={s.content}>
          <div className={s.contentLeft}>
            {isMobile && (
              <>
                <button className={navToggleClassName} onClick={handleMobileMenuToggleClick} type="button">
                  <span className={s.navToggleItem}>Menu</span>
                </button>

                {isMobileMenuActive && nav}
              </>
            )}

            <Link className={s.logo} to={'/'}>
              <img className={s.logoImg} src={logo128} alt="logo" />
              {!isMobile && (
                <span className={s.logoText}>
                  <span>Buffer</span>Overflow
                </span>
              )}
            </Link>
          </div>

          {!isMobile && nav}

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
              {!isMobile && logoutBtn}
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
