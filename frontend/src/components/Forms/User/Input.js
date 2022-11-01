import React from 'react'

const Input = ({ field, setFormData, fieldName, typeInput, value }) => {

    const handleFormData = e => {
        setFormData(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className='form__field-controller'>
            <label htmlFor={field}>{fieldName}</label>
            <input type={typeInput} id={field} name={field} onChange={handleFormData} value={value} required />
        </div>
    );
}

export default Input;