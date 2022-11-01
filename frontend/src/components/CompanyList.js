import React, { useEffect } from 'react';
import SingleCompany from './SingleCompany';

const CompanyList = ({ companyList, getData }) => {

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {companyList.map(el => (
                <SingleCompany {...el} key={el._id} />
            ))}
        </>
    );
}

export default CompanyList;