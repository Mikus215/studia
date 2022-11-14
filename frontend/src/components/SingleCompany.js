import React from 'react';
import CommentCompany from './Forms/CreateCompany/CommentCompany';
import RateCompany from './Forms/CreateCompany/RateCompany';
import Rating from './Rating';
import SingleComment from './SingleComment';
import { useContextUser } from '../Context/ContextUserLogin';

const SingleCompany = ({ title, description, _id, avgRating, comments, countRating, getData }) => {

    const { isLogin } = useContextUser()

    return (
        <>
            <div className="company__container">
                <div className="company__box">
                    <p>Nazwa firmy: {title}</p> <Rating value={avgRating} countRating={countRating} />
                </div>
                <p className='company__description'>Opis: {description}</p>
                {comments.map(el => <SingleComment key={el._id} {...el} />)}
                {isLogin.userId
                    &&
                    <>
                        <CommentCompany _id={_id} getData={getData}/>
                        <RateCompany _id={_id} />
                    </>
                }
            </div>
            <div className="company__underline"></div>
        </>
    );
}

export default SingleCompany;