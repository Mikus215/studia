import React, { useState } from 'react';
import Input from './Input';
import { registerUser } from '../../../api';
import { useContextUser } from '../../../Context/ContextUserLogin';
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigation = useNavigate()
    const { handleLogin } = useContextUser()

    const [error, setError] = useState("")
    const [userFormData, setUserFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const validation = () => {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        if (!emailRegex.test(userFormData.email)) {
            setError("Nie poprawny e-mail")
            return false
        }
        if (userFormData.name.length < 3) {
            setError("Długość nazwy użytkownika musi być większa niż 3 znaki")
            return false
        }
        if (userFormData.password.length < 5) {
            setError("Długość hasła musi być większa niż 5 znaki")
            return false
        }
        if (userFormData.password !== userFormData.confirmPassword) {
            setError("Hasła różnią się od siebie")
            return false
        }
        setError("")
        return true
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!validation()) return;

        try {
            const { data } = await registerUser(userFormData)
            handleLogin(data)
            localStorage.setItem('user', JSON.stringify({
                userId: data.userId,
                userName: data.userName,
                isModerator: data.isModerator,
                expireDateUserToken: Date.now()
            }))
            setError("")
            setUserFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
            navigation("/")
        } catch (error) {
            console.log(error)
            setError(error.response.data.message);
        }
    }

    return (
        <>
            <form onSubmit={submitHandler} className='form form-padding'>
                <Input setFormData={setUserFormData} field={"name"} fieldName={"Nazwa użytkownika"} typeInput="text" value={userFormData.name} />
                <Input setFormData={setUserFormData} field={"email"} fieldName={"E-mail"} typeInput="text" value={userFormData.email} />
                <Input setFormData={setUserFormData} field={"password"} fieldName={"Hasło"} typeInput="password" value={userFormData.password} />
                <Input setFormData={setUserFormData} field={"confirmPassword"} fieldName={"Powtórz Hasło"} typeInput="password" value={userFormData.confirmPassword} />
                <button type='submit' className='form__form-register-button'>Zarejestruj się</button>
            </form>
            {error && <p className='form__error'>{error}</p>}
        </>
    );
}

export default Register;