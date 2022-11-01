import React from 'react';

const SingleComment = ({ comment, userName }) => {
    return (
        <div className="company__comment">
            <p>Użytkownik: {userName}</p>
            <p>Komentarz: {comment}</p>
        </div>
    );
}

export default SingleComment;