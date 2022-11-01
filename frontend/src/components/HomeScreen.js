import React, { useState } from 'react';
import CompanyList from './CompanyList';
import Search from './Search';
import { getCompanies } from '../api';
import Filter from './Filter';

const HomeScreen = () => {

    const getData = async () => {
        try {
            const { data } = await getCompanies()
            setComapnyList(data)
        } catch (error) {
            console.log(error)
        }
    }

    const [companyList, setComapnyList] = useState([])

    return (
        <div className='home'>
            <Search setComapnyList={setComapnyList} onGetData={getData} />
            <Filter setComapnyList={setComapnyList} />
            <CompanyList companyList={companyList} setComapnyList={setComapnyList} getData={getData} />
        </div>
    );
}

export default HomeScreen;