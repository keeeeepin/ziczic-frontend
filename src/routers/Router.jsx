import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../auth/Login";
import Signup from "../auth/Signup";

import CheckLogingState from "../apis/utils/CheckLogingState";
import UserAuth from "../apis/utils/UserAuth";

import Home from "../pages/Home";
import MainRouter  from './MainRouter';
// import Main from "../pages/Main";

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path={'/'} element = {<Home />} />
            {/* <Route path={'/main'} element = {
                    <UserAuth>
                        <Main />
                    </UserAuth>
                }/> */}
            
            <Route path={'/signup'} element={
                // <CheckLogingState>
                    <Signup />
                // </CheckLogingState>
            }/>
            <Route path={'/login'} element={
                // <CheckLogingState>
                    <Login />
                // </CheckLogingState>
            }/>
            <Route path={'/ziczic/*'} element = {<MainRouter />} />
        </Routes>

        </BrowserRouter>
    )
}

export default Router;