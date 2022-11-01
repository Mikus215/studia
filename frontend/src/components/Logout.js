import React from 'react';
import { logoutUser } from '../api';
import { useContextUser } from '../Context/ContextUserLogin';

const Logout = () => {

    const { handleLogout } = useContextUser()

    const logoutHandler = async () => {
        try {
            await logoutUser()
            localStorage.clear()
            handleLogout()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={logoutHandler} className="logout header__nav-item">Wyloguj</button>
    );
}

export default Logout;