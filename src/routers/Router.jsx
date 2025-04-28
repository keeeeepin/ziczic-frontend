import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../auth/Login';
import Signup from '../auth/Signup';

import CheckLogingState from '../apis/utils/CheckLogingState';
import UserAuth from '../apis/utils/UserAuth';

import Home from '../pages/Home';
import MainRouter from './MainRouter';
// import Main from "../pages/Main";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />

        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/ziczic/*'} element={<MainRouter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
