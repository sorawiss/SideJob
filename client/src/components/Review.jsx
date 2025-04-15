import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';


import cutWords from '../function/WordCuter'

import { Rating } from "@material-tailwind/react";

import ProfileOnTop from './ProfileOnTop';



function Review({ member, detail, date, rating, reviewId }) {

    const [seeMore, setSeeMore] = useState(false)

    const showText = () => {
        return seeMore ? true : 150;
    }

    return (
        <div className='review-container bg-primarylight w-[100%] rounded-[16px] py-[0.5rem] px-[1rem] flex flex-col gap-[1rem] '>
            <Link to={'/profile/' + member.id}>
                <ProfileOnTop fname={member.fname} lname={member.lname} date={date} reviewerID={member.id} reviewId={reviewId} profilePic={member.profile_picture} />
            </Link>

            <div className="star-wrapper">
                <Rating value={rating} readonly ratedColor="amber" />
            </div>

            <div className="detail-wrapper w-[100%]  ">
                <p onClick={() => setSeeMore(!seeMore)} className=' break-words ' > {cutWords(detail, showText())} </p>
            </div>
        </div>
    )
}

export default Review