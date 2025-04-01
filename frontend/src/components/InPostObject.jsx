import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom';

import starIcon from '../assets/svg/star.svg'

import WordCuter from '../function/WordCuter';

function PostObject({ postDate, title, details, salary, location, review, picture, posterID, category, members }) {

    const dateFormat = new Date(postDate).toLocaleDateString('th-TH');



    // avgRating FUNCTION
    function avgRating(review) {
        if (review.length === 0) return null
        let sum = 0
        for (let i = 0; i < review.length; i++) {
            sum += review[i].rating
        }
        return (sum / review.length).toFixed(2)
    }


    return (
        <div className='Inpost-object-container w-[30rem] bg-white p-[1rem] rounded-[16px] flex flex-col gap-[1rem] p-1rem '>

            {/* ProfileSection (Header) */}

            <div className="profile flex gap-[0.5rem] ">
                {/* ProfilePic */}
                <Link to={'profile/' + posterID} className=''>
                    <img src="*" alt="" className='w-[2.6rem] h-[2.6rem] ' />
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

                {picture.length > 0 ? (
                    picture.map((items, index) => {
                        return(
                        <img key={index} src={'/upload/' + items.image} alt="Image in post" className='w-[100%] my-[1rem] ' />)
                    }))
                     : null
                    
                    }

                <div className="price bg-primarydark w-[10rem] rounded-[16px] px-[1rem] py-[4px] flex items-center mt-[0.9rem] ">
                    <p className='text-accent '>{salary.toLocaleString()} บาท</p>
                </div>
            </div>




        </div>
    )
}

export default PostObject