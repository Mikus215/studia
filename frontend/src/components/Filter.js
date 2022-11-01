import React, { useState } from 'react';
import { getPopularCompany, getBestCompany } from '../api';

const Filter = ({ setComapnyList }) => {
    const [chooseFilter, setChooseFilter] = useState("");

    const handleFormData = e => setChooseFilter(e.target.value)


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            if (chooseFilter === 'best-opinions') {
                const { data } = await getBestCompany()
                setComapnyList(data)
            } else {
                const { data } = await getPopularCompany()
                setComapnyList(data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="filter">
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="filter" className='filter__label'>Filtruj po: </label>
                <select name="" id="filter" onChange={handleFormData}>
                    <option value="number-of-opinions">Ilość opinii</option>
                    <option value="best-opinions">Od najlepszych do najgorszych</option>
                </select>
                <button className='form__form-search-button'>Filtruj</button>
            </form>
        </div>
    );
}

export default Filter;