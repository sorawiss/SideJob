import React from 'react'

import { Rating } from "@material-tailwind/react";

function RateStar( {rating, setRating} ) {
    return (
        <div className="rate-wrapper flex flex-col items-center gap[1rem] ">
            <h2 className='text-primarydark' >ให้คะแนน</h2>
            <Rating unratedColor="amber" ratedColor="amber" className='custom-rating'
                value={rating}
                onChange={(e) => setRating(e)}
            />
        </div>
    )
}

export default RateStar