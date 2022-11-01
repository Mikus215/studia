import { useState, createContext, useContext } from 'react'

const UserContext = createContext({})

export function useContextUser() {
    return useContext(UserContext)
}

const ContextUserLogin = ({ children }) => {
    const [isLogin, setIsLogin] = useState({
        userId: "",
        userName: ""
    })

    const handleLogin = user => setIsLogin({
        userId: user.userId,
        userName: user.userName
    })
    const handleLogout = () => setIsLogin({
        userId: "",
        userName: ""
    })

    return (
        <UserContext.Provider value={{
            isLogin,
            handleLogin,
            handleLogout
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default ContextUserLogin;