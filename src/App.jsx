import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Post from './pages/Post/Post';
import PostCreate from './pages/PostCreate/PostCreate';
import PostEdit from './pages/PostEdit/PostEdit';
import Profile from './pages/Profile/Profile';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit';
import Questions from './pages/Questions/Questions';
import Register from './pages/Register/Register';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import PageLayout from './shared/PageLayout/PageLayout';
import ProtectedRoute from './shared/ProtectedRoute/ProtectedRoute';
import './styles/index.scss';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Questions />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/post/:postId" element={<Post />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/post/:postId/edit" element={<PostEdit />} />
            <Route path="/post/create" element={<PostCreate />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
