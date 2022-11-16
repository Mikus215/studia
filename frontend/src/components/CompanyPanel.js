import React, { useEffect, useState } from 'react'
import { getUserListCompany } from '../api';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const CompanyPanel = () => {

    const [userCompany, serUserCompany] = useState([])
    const [success, setSuccess] = useState("")

    useEffect(() => {
        const getUserList = async () => {
            try {
                const { data } = await getUserListCompany()
                serUserCompany(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserList()
    }, [])

    console.log(userCompany);

    return (
        <>
            {userCompany.length === 0 && <p className='company__empty-panel'>Brak zarejestrowanych firm</p>}
            {userCompany.map(el => (
                <div className="company" key={el._id}>
                    <p className='company__panel-title'>{el.title}</p> <EditButton company={el} setSuccess={setSuccess} /> <DeleteButton companyId={el._id} serUserCompany={serUserCompany} setSuccess={setSuccess} />
                </div>
            ))}
            {success && <p className='company__success'>{success}</p>}
        </>
    );
}

export default CompanyPanel;