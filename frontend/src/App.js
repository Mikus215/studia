import React, { useEffect } from 'react';
import './styles/app.scss'
import Login from './components/Forms/User/Login';
import Register from './components/Forms/User/Register';
import { useContextUser } from './Context/ContextUserLogin'
import { logoutUser } from './api';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './components/HomeScreen';
import Header from './components/Header';
import CompanyPanel from './components/CompanyPanel'
import RegisterComapny from './components/Forms/CreateCompany/RegisterCompany';

function App() {

  const { handleLogin, handleLogout } = useContextUser()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return

    const logoutFunction = async () => {
      try {
        await logoutUser()
        localStorage.clear()
        handleLogout()
      } catch (error) {
        console.log(error);
      }
    }

    if (Math.floor((Date.now() - user.expireDateUserToken) / 1000) >= 3600) {
      logoutFunction()
    } else {
      handleLogin({
        userId: user.userId,
        userName: user.userName,
        isModerator: user.isModerator
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/register' element={<Register />} />
        <Route path='/company/panel' element={<CompanyPanel />} />
        <Route path='/company/register' element={<RegisterComapny />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
