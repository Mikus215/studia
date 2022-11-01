import React, { useState } from 'react'
import Input from './Input'
import { loginUser } from '../../../api'
import { useContextUser } from '../../../Context/ContextUserLogin'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const navigation = useNavigate()
    const { handleLogin } = useContextUser()
    const [error, setError] = useState("")
    const [userFormData, setUserFormData] = useState({
        email: "",
        password: ""
    })

    const validation = () => {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        if (!emailRegex.test(userFormData.email)) {
            setError("Nie poprawny e-mail")
            return false
        }
        if (userFormData.password.length < 5) {
            setError("Złe hasło, za krótkie")
            return false
        }
        setError("")
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validation()) return;

        try {
            const { data } = await loginUser(userFormData)
            handleLogin(data)
            localStorage.setItem('user', JSON.stringify({
                userId: data.userId,
                userName: data.userName,
                expireDateUserToken: Date.now()
            }))
            setUserFormData({
                email: "",
                password: ""
            })
            navigation("/")
        } catch (error) {
            console.log(error)
            setError(error.response.data.message);
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit} className='form form-padding'>
                <Input setFormData={setUserFormData} field={"email"} fieldName={"E-mail"} typeInput="text" value={userFormData.email} />
                <Input setFormData={setUserFormData} field={"password"} fieldName={"Hasło"} typeInput="password" value={userFormData.password} />
                <button type='submit' className='form__form-register-button'>Zaloguj się</button>
            </form>
            {error && <p className='form__error'>{error}</p>}
            <Link to={"/user/register"} className="form__redirect-register">Nie masz jeszcze konta? Zarejestruj się</Link>
        </>
    );
}

export default Login;