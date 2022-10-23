import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Post from './pages/Post/Post';
import PostCreate from './pages/PostCreate/PostCreate';
import PostEdit from './pages/PostEdit/PostEdit';
import Register from './pages/Register/Register';
import PageLayout from './shared/PageLayout/PageLayout';
import ProtectedRoute from './shared/ProtectedRoute/ProtectedRoute';
import './styles/index.scss';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PageLayout />}>

          <Route path="/create" element={<PostCreate />} /> //!
          <Route path="edit" element={<PostEdit />} />
          
          <Route path="/" element={<Home />} />
          <Route path="/post">
            <Route path=":postId" element={<Post />} />
            <Route element={<ProtectedRoute />}>
              <Route path=":postId/edit" element={<PostEdit />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="create" element={<PostCreate />} />
            </Route>
          </Route>
          <Route path="/questions" element={<div>questions</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<div>profile</div>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
