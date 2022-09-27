import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Avatar, Link as LinkDesign, User } from '@geist-ui/core';
import Container from '../Container/Container';

import s from './Header.module.scss';

const Header = () => {
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
            <NavLink to="/questioins" className={({ isActive }) => (isActive ? `${s.navLink} ${s.active}` : s.navLink)}>
              Questions
            </NavLink>
          </nav>

          <div className={s.user}>
            <Link to={'/profile'}> //! add color default
              <Avatar scale={1.5} src={`${process.env.REACT_APP_API_URL}images/defaultAvatar/defaultAvatar.jpg`} text="YC" />
            </Link>
            <div className={s.userInfo}>
              <span className={s.userName}>ychuiko</span>
              <span className={s.userRole}>user</span>
            </div>
          </div>

          {/* <User src={`${process.env.REACT_APP_API_URL}images/defaultAvatar/defaultAvatar.jpg`} name="ychuiko">
            user
          </User> */}
        </div>
      </Container>
    </header>
  );
};

export default Header;
