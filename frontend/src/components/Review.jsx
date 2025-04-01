import React from 'react'
import moment from 'moment'
import { useState } from 'react'

import cutWords from '../function/WordCuter'

import { Rating } from "@material-tailwind/react";



function Review({ member, detail, date, rating }) {

    const [seeMore, setSeeMore] = useState(false)

    const showText = () => {
        return seeMore ? true : 150;
    }

    return (
        <div className='review-container bg-primarylight w-[100%] rounded-[16px] py-[0.5rem] px-[1rem] flex flex-col gap-[1rem] '>
            <div className="profile-wrapper flex  gap-[0.5rem] items-center ">
                <img src="*" alt="profile picture" className='w-[2.6rem] h-[2.6rem] ' />
                <p>{member.fname} {member.lname}</p>
                <p className='p2 text-secondary '>{moment(date).fromNow()}</p>
            </div>

            <div className="star-wrapper">
                <Rating value={rating} readonly ratedColor="amber" />
            </div>

            <div className="detail-wrapper  ">
                <p onClick={() => { setSeeMore(!seeMore) }} className='text-primarydark p1_5' >{cutWords(detail, showText())}</p>
            </div>
        </div>
    )
}

export default Review