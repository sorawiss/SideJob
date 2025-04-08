import React from 'react'

import starLG from '../assets/svg/star-lg.svg'

function ShowRating({avgRating, numberOfRating}) {
    
    return (
        <div>
            <h2>คะแนนและความคิดเห็น</h2>

            <div className="review-point flex flex-col items-center gap-[1.5rem]">
                <div className="reviwe-rating flex items-center gap-[0.7rem] ">
                    <img src={starLG} alt="star rating icon" />
                    <h2 className='text-secondary' >{avgRating}</h2>
                </div>

                <p className='text-secondary' >ผู้รีวิว {numberOfRating} คน</p>
            </div>
        </div>
    )
}

export default ShowRating