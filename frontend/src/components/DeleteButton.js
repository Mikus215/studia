import React from 'react';
import { deleteCompany } from '../api';

const DeleteButton = ({ companyId, serUserCompany, setSuccess }) => {

    const handleDelete = async () => {

        try {
            const { data } = await deleteCompany(companyId)
            setSuccess(data.message)

            serUserCompany(prevState => {
                return prevState.filter(el => el._id !== companyId)
            })

        } catch (error) {

        }
    }

    return (
        <>
            <button onClick={handleDelete} className="form__form-register-button form__form-register-button--danger">Usuń</button>
        </>
    );
}

export default DeleteButton;