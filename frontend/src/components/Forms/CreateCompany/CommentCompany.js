import React, { useState } from 'react';
import { addCompanyComment } from '../../../api';

const CommentCompany = ({ _id }) => {
    const [userComment, setUserComment] = useState("")
    const [success, setSuccess] = useState("")
    const handleCommentData = e => setUserComment(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addCompanyComment(userComment, _id)
            setSuccess("Dodałeś komentarz")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="company__form-comment">
                <label htmlFor="">Skomentuj</label>
                <textarea type="text" onChange={handleCommentData} className="company__form-comment-textarea" />
                <button type='submit' className="company__form-comment-button">Dodaj komentarz</button>
            </form>
            {success && <p className='company__success'>{success}</p>}
        </>
    );
}

export default CommentCompany;