import React, { useState } from 'react'
import { getSearchedCompany } from '../api'

const Search = ({ setComapnyList, onGetData, paginate }) => {

    const [searchField, setSearchField] = useState("")
    const [error, setError] = useState("")

    const handleSearchField = e => {
        setSearchField(e.target.value)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const { data } = await getSearchedCompany(searchField)
            paginate(1)
            setComapnyList(data)
            setError("")
        } catch (error) {
            console.log(error)
            setError(error.response.data.message);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='form__field-controller form__field-controller--home-page'>
                    <label htmlFor={"search"}>{"Wyszukaj firmę wpisując jej nazwę"}</label>
                    <input type={"text"} id={"search"} name={"search"} onChange={handleSearchField} value={searchField} required />
                    <div className='form__search-btn-box'>
                        <button onClick={() => {
                            onGetData()
                            setSearchField("")
                        }} className='form__form-search-button'>Pokaż wszystkie</button>
                        <button type='submit' className='form__form-search-button'>Szukaj</button>
                    </div>
                </div>
            </form>
            {error && <p className='form__error'>{error}</p>}
        </>
    );
}

export default Search;