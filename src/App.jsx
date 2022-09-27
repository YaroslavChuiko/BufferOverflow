import { Card } from '@geist-ui/core';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './shared/Header/Header';
import './styles/index.scss';


const App = () => {
  return (
    <>
      {/* <section className="hero"></section>
      <main>
        <section>
          <h1>Oh hai, React</h1>
        </section>
        <img src={sword} alt="sword" width={250}/>
        <img src={swordSvg} alt="sword" width={250}/>
        <SwordSvg className='sword' />
        <Recipes />
        <Whatever />
      </main> */}

      {/* <Card shadow width="100%" height='64px' /> */}
      <Header/>

      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route path="dialog/:id" element={<DailyWeatherModal />} /> */}
        </Route>
        <Route path="/profile" element={<div>profile</div>} />
      </Routes>
    </>
  );
};

export default App;
