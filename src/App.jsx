import { Card } from '@geist-ui/core';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Header from './shared/Header/Header';
import PageLayout from './shared/PageLayout/PageLayout';
import './styles/index.scss';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<div>profile</div>} />
          <Route path="/questions" element={<div>questions</div>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
