import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useState } from 'react';

import starIcon from '../assets/svg/star.svg'
import phone from '../assets/svg/phone.svg'
import line from '../assets/svg/line.svg'
import gmail from '../assets/svg/gmail.svg'
import profile from '../assets/svg/profile.svg'


import WordCuter from '../function/WordCuter';
import avgRating from '../function/avgRating';
import ShowRating from './ShowRating';

import Review from './Review'
import OpenReview from './OpenReview';
import RateStar from './RateStar';
import ImageDialog from './ImageDialog';
import PriceButton from './PriceButton';


function InPostObject({ postDate, title, details, salary, location, picture, posterID, category, members, review, profile_picture, postID, isJob }) {

    const dateFormat = new Date(postDate).toLocaleDateString('th-TH');

    const [rating, setRating] = useState(0);


    return (
        <div className='Inpost-object-container w-[30rem] bg-white p-[1rem] rounded-[16px] flex flex-col gap-[5rem] p-1rem min-h-screen '>
            {/* AllOfPostWrapper */}
            <div className="all-of-post-wrapper flex flex-col gap-[1rem] ">
                {/* ProfileSection (Header) */}
                <div className="profile flex gap-[0.5rem] ">
                    {/* ProfilePic */}
                    <Link to={'/profile/' + posterID} className=''>
                        <img src={ profile_picture ? profile_picture : profile } alt="" className='w-[2.6rem] h-[2.6rem] ' />
                    </Link>



                    {/* ProfileDetail */}
                    <div className="profile-detail gap-[0.5rem] w-[22rem] ">
                        <div className="upper flex gap-[0.5rem] items-center mb-[0.4rem] ">
                            <Link to={'profile/' + posterID}>
                                <p>{members.fname} {members.lname} </p>
                            </Link>

                            <div className="categary bg-accent px-[0.5rem] py-[1px] rounded-[16px] p2 ">
                                {category.name}
                            </div>

                            <div className="rating flex items-center gap-[2px] ">
                                {review.length > 0 ? (
                                    <>
                                        <img src={starIcon} alt="" className='w-[1.2rem] h-[1.2rem] ' />
                                        <p className='text-primarydark mt-[4px] p2 inline '> {avgRating(review)} </p> <p className='inline mt-[4px] p2 text-secondary '>({review.length})</p>
                                    </>)
                                    : null}
                            </div>
                        </div>


                        <div className="lower flex gap-[1rem] ">
                            <p className='p3 text-secondary '>{moment(postDate).fromNow()}</p>
                            <p className='p3 text-secondary'>{WordCuter(location, 54)}</p>
                        </div>
                    </div>

                </div>



                {/* PostSection */}
                <div className="post-section  ">
                    <h2 className='text-primarydark'>{title}</h2>
                    <p className='p2 text-secondary'>{details}</p>


                    <div className="contact-wrapper mt-[1rem] flex flex-col gap-[0.5rem] ">
                        {members.phone_number ? (
                            <div className="phone-wrapper flex items-center gap-[0.5rem] ">
                                <img src={phone} alt="Phone Icoon" className='inline ' />
                                <p className='inline ' > {members.phone_number} </p>
                            </div>
                        ) : null}

                        {members.phone_number ? (
                            <div className="phone-wrapper flex items-center gap-[0.5rem] p2 ">
                                <img src={line} alt="Phone Icoon" className='inline ' />
                                <p className='inline ' > {members.phone_number} </p>
                            </div>
                        ) : null}

                        {members.phone_number ? (
                            <div className="phone-wrapper flex items-center gap-[0.5rem]  ">
                                <img src={gmail} alt="Phone Icoon" className='inline ' />
                                <p className='inline ' > {members.phone_number} </p>
                            </div>
                        ) : null}


                        <div className="price bg-primarydark w-[10rem] rounded-[16px] px-[1rem] py-[4px] flex items-center mt-[0.9rem] ">
                            <p className='text-accent '>{salary.toLocaleString()} บาท</p>
                        </div>


                        {picture.length > 0 ? (
                            <PriceButton text={salary.toLocaleString()} isJob={isJob} />    
                        
                        )
                            : null

                        }
                    </div>
                </div>
            </div>



            {/* Rate */}
            <RateStar rating={rating} setRating={setRating} />




            {/* ReviewRating */}
            <div className="review-wrapper flex flex-col items-center gap-[1.5rem] ">
                <ShowRating avgRating={avgRating(review)} numberOfRating={review.length} />


                {/* ReviewSection */}
                <div className="review-wrapper flex flex-col items-center gap-[1rem] w-[100%] ">
                    {review.length > 0 ? (
                        review.map((items, index) => {
                            return (
                                <Review key={index} member={items.members} detail={items.reviewDetails} date={items.reviewDate} rating={items.rating} postID={postID} id={items.id} />
                            )
                        })
                    ) : null}
                </div>
            </div>
            {rating > 0 ? <OpenReview rating={rating} setRating={setRating} postID={postID} posterID={posterID} /> : null }
        </div>
    )
}

export default InPostObject