import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom';

import starIcon from '../assets/svg/star.svg'
import profile from '../assets/svg/profile.svg'

import WordCuter from '../function/WordCuter';
import avgRating from '../function/AvgRating.js';

import PriceButton from './PriceButton';

function PostObject({ postDate, title, detail, price, fname, lname, category, location, rating, images, postID : postID, posterID, profilePic, isJob }) {

    const dateFormat = new Date(postDate).toLocaleDateString('th-TH');



    const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME
    
    return (
        <div className={`${isJob ? "bg-white" : "bg-secondarylight "} post-object-container w-[30rem] p-[1rem] rounded-[16px] flex flex-col gap-[1rem]`} >

            {/* ProfileSection (Header) */}

            <div className="profile flex gap-[0.5rem] ">
                {/* ProfilePic */}
                <Link to={'/profile/' + posterID} className=''>
                    <img src={ profilePic ? "/upload/" + profilePic : profile } alt="" className='w-[2.6rem] h-[2.6rem] rounded-full object-cover ' />
                </Link>
    

                {/* ProfileDetail */}
                <div className="profile-detail gap-[0.5rem] w-[22rem] ">
                    <div className="upper flex gap-[0.5rem] items-center mb-[0.4rem] ">
                        <Link to={'/profile/' + posterID}>
                            <p>{fname} {lname}</p>
                        </Link>

                        <div className="categary bg-accent px-[0.5rem] py-[1px] rounded-[16px] p2 ">
                            {category}
                        </div>

                        <div className="rating flex items-center gap-[2px] ">
                            {rating.length > 0 ? (
                                <>
                                    <img src={starIcon} alt="" className='w-[1.2rem] h-[1.2rem] ' />
                                    <p className='text-primarydark mt-[4px] p2 inline '> {avgRating(rating)} </p> <p className='inline mt-[4px] p2 text-secondary '>({rating.length})</p>
                                </>)
                                : null}
                        </div>
                    </div>


                    <div className="lower flex gap-[1rem] ">
                        <p className='p3 text-secondary '>{moment(postDate).fromNow()}</p>
                        {location && <p className='p3 text-secondary'>📍{location}</p>}
                    </div>
                </div>

            </div>


            {/* PostSection */}
            <Link to={'/post/' + postID} >
                <div className="post-section  ">
                    <h2 className='text-primarydark'>{title}</h2>
                    <p className='p2 text-secondary'>{WordCuter(detail, 200)}</p>

                    {images.length > 0 ? (<img src={`${images[0].image}`} alt="Image in post" className='max-h-[20rem] object-cover w-[100%] rounded-[8px] ' />) : null}

                    <PriceButton isJob={isJob} text={`${price.toLocaleString('th-TH')}`} />
                </div>
            </Link>



        </div>
    )
}

export default PostObject