import React from 'react'

import starLG from '../assets/svg/star-lg.svg'
import avgRating from '../function/avgRating'

function ShowRating(review) {
    
    console.log(review)
    
    return (
        <div>
            <h2>คะแนนและความคิดเห็น</h2>

            <div className="review-point flex flex-col items-center gap-[1.5rem]">
                <div className="reviwe-rating flex items-center gap-[0.7rem] ">
                    <img src={starLG} alt="star rating icon" />
                    <h2 className='text-secondary' > {avgRating(review)} </h2>
                </div>

                <p className='text-secondary' >ผู้รีวิว {review.length} คน</p>
            </div>
        </div>
    )
}

export default ShowRating