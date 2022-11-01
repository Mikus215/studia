import React, { useState } from 'react'
import { addCompanyRate } from '../../../api'

const RateCompany = ({ _id }) => {

    const [userRate, setUserRate] = useState("")
    const [success, setSuccess] = useState("")
    const handleRateData = e => setUserRate(e.target.value)

    const handleSelectForm = async (e) => {
        e.preventDefault();

        try {
            await addCompanyRate(userRate, _id)
            setSuccess("Dodałeś ocenę")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSelectForm}>
                <label htmlFor="rate">Oceń firmę</label>
                <select name="rate" id="rate" onChange={handleRateData} className="company__form-rate">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button type='submit' className='company__form-rate-button'>Dodaj ocenę</button>
            </form>
            {success && <p className='company__success'>{success}</p>}
        </>
    );
}

export default RateCompany;