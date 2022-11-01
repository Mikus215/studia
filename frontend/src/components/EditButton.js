import React, { useState } from 'react'
import Input from './Forms/User/Input'
import { updateCompany } from '../api'

const EditButton = ({ company, setSuccess }) => {

    const [error, setError] = useState("")
    const [editingMode, setEditingMode] = useState(false)
    const [updateCompanyFormData, setUpdateCompanyFormData] = useState({
        title: company.title,
        description: company.description
    })

    const handleTextAreaData = e => {
        setUpdateCompanyFormData(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handlSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await updateCompany(company._id, updateCompanyFormData)
            setError("")
            setSuccess(data.message)
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
    }

    const handleEditMode = () => setEditingMode(prevState => !prevState)

    return (
        <>
            {
                editingMode
                &&
                <form onSubmit={handlSubmit} className='form'>
                    <Input setFormData={setUpdateCompanyFormData} field={"title"} fieldName={"Nazwa firmy"} typeInput={"text"} value={updateCompanyFormData.title} />
                    <div className='form__field-controller'>
                        <label htmlFor="description">Opis</label>
                        <textarea className='form__description' name="description" id="description" value={updateCompanyFormData.description} onChange={handleTextAreaData}></textarea>
                    </div>
                    <button type='submit' className='form__form-register-button'>Uaktualnij firmę</button>
                </form>
            }
            <button onClick={handleEditMode} className='form__form-register-button'>{editingMode ? "Koniec edycji" : "Edytuj"}</button>
            {error && <p className='form__error'>{error}</p>}
        </>
    );
}

export default EditButton;