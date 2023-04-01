import React from 'react'
import { useContextUser } from '../Context/ContextUserLogin';
import Logout from './Logout';
import { Link } from 'react-router-dom';

const Header = () => {
    const { isLogin } = useContextUser()
    return (
      <header className="header">
        <Link to={"/"} className="header__nav-item">
          Stron Główna
        </Link>
        {isLogin.userId && (
          <div className="header__box">
            {isLogin.isModerator && (
              <>
                <Link to={"/company/register"} className="header__nav-item">
                  Zarejestruj firmę
                </Link>
                <Link
                  to={"/company/panel"}
                  className="header__company-panel header__nav-item"
                >
                  Panel firm
                </Link>
              </>
            )}
            <Logout />
          </div>
        )}
        <div className='header__nav-box'>
          {!isLogin.userId && (
            <Link to={"/news"} className="header__nav-item">
              Aktualności
            </Link>
          )}
          {!isLogin.userId && (
            <Link to={"/gallery"} className="header__nav-item">
              Galeria
            </Link>
          )}
          {!isLogin.userId && (
            <Link to={"/user/login"} className="header__nav-item">
              Zaloguj się
            </Link>
          )}
        </div>
      </header>
    );
}

export default Header;