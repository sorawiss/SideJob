import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom';

import starIcon from '../assets/svg/star.svg'

import WordCuter from '../function/WordCuter';

function PostObject({ postDate, title, detail, price, fname, lname, category, location, rating, images, postID }) {

    const dateFormat = new Date(postDate).toLocaleDateString('th-TH');



    // avgRating FUNCTION
    function avgRating(rating) {
        if (rating.length === 0) return null
        let sum = 0
        for (let i = 0; i < rating.length; i++) {
            sum += rating[i].rating
        }
        return (sum / rating.length).toFixed(2)
    }


    return (
        <div className='post-object-container w-[30rem] bg-white p-[1rem] rounded-[16px] flex flex-col gap-[1rem] p-1rem '>

            {/* ProfileSection (Header) */}
            <div className="profile flex gap-[0.5rem] ">
                {/* ProfilePic */}
                <img src="*" alt="" className='w-[2.6rem] h-[2.6rem] ' />

                {/* ProfileDetail */}
                <div className="profile-detail gap-[0.5rem] w-[22rem] ">
                    <div className="upper flex gap-[0.5rem] items-center mb-[0.4rem] ">
                        <p>{fname} {lname}</p>

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
                        <p className='p3 text-secondary'>{WordCuter(location, 54)}</p>
                    </div>
                </div>

            </div>


            {/* PostSection */}
            <Link to={'post/' + postID} >
                <div className="post-section  ">
                    <h2 className='text-primarydark'>{title}</h2>
                    <p className='p2 text-secondary'>{detail}</p>

                    {images.length > 0 ? (<img src={'/upload/' + images[0].image} alt="Image in post" className='max-h-[15rem] object-cover w-[100%] ' />) : null}

                    <div className="price bg-primarydark w-[10rem] rounded-[16px] px-[1rem] py-[4px] flex items-center mt-[0.9rem] ">
                        <p className='text-accent '>{price.toLocaleString()} บาท</p>
                    </div>
                </div>
            </Link>



        </div>
    )
}

export default PostObject