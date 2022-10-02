import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PageLayout from './shared/PageLayout/PageLayout';
import { isLoggedIn } from './store/thunks/userThunk';
import './styles/index.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn())
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
