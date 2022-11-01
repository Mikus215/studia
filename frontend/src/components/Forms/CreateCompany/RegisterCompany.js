import React, { useState } from 'react';
import Input from '../User/Input';
import { registerCompany } from '../../../api';
import { useNavigate } from 'react-router-dom'

const RegisterComapny = () => {

    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [companyFormData, setCompanyFormData] = useState({
        title: "",
        description: ""
    })

    const handleTextAreaData = e => {
        setCompanyFormData(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handlSubmit = async (e) => {
        e.preventDefault();

        try {
            await registerCompany(companyFormData)
            setError("")
            navigation("/")
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
    }

    return (
        <>
            <form onSubmit={handlSubmit} className='form form-padding'>
                <Input setFormData={setCompanyFormData} field={"title"} fieldName={"Nazwa firmy"} typeInput={"text"} value={companyFormData.title} />
                <div className='form__field-controller'>
                    <label htmlFor="description">Krótki opis</label>
                    <textarea className='form__description' name="description" id="description" value={companyFormData.description} onChange={handleTextAreaData}></textarea>
                </div>
                <button type='submit' className='form__form-register-button'>Zarejestruj firmę</button>
            </form>
            {error && <p className='form__error'>{error}</p>}
        </>
    );
}

export default RegisterComapny;