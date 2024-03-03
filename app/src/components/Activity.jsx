import React, { useRef, useEffect, useState } from 'react';
import './../resources/styles/components/Activity.css';
import { getImage } from './../firebase'

function Activity(act) {
    const a = act.act;

    const [imgUrl, setImgUrl] = useState('');

    const getImg = async () => {
        setImgUrl(await getImage("activity", a.images[0]));
    }

    useEffect(() => {
        getImg();
    }, [act]);



    return(
        <div className="card">
            <div className="card-title">
                {a.name}
            </div>
            <div className="card-text">
                <div className="card-info">
                    <div className="card-text">
                        Difficulty: {a.difficultyRating},
                        Safety: {a.safetyRating},
                        Enjoyment: {a.enjoymentRating}
                    </div>
                </div>
            </div>
            <div className="card-img-container">
                <img className="card-image" src={imgUrl}/>
            </div>
        </div>
    );
}

export default Activity;