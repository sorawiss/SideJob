import React from 'react'

import starIcon from '../assets/svg/star.svg'
import pinIcon from '../assets/svg/pin.svg'

import WordCuter from '../function/WordCuter';

function PostObject( {postDate, title, detail, price, fname, lname, category} ) {

    const dateFormat = new Date(postDate).toLocaleDateString('th-TH');

    return (
        <div className='post-object-container w-[30rem] bg-white p-[1rem] rounded-[16px] flex flex-col gap-[1rem] p-1rem '>
            {/* ProfileSection (Header) */}
            <div className="profile flex gap-[0.5rem] ">
                <img src="*" alt="" className='w-[2.6rem] h-[2.6rem] ' />

                <div className="profile-detail gap-[0.5rem]">
                    <div className="upper flex gap-[0.5rem] items-center mb-[0.4rem] ">
                        <p>{fname} {lname}</p>

                        <div className="categary bg-accent px-[0.5rem] py-[1px] rounded-[16px] ">
                            {category}
                        </div>

                        <div className="rating">
                            <img src={starIcon} alt="" className='w-[1.2rem] h-[1.2rem] '/>
                        </div>
                    </div>


                    <div className="lower flex gap-[0.5rem] ">
                         <p className='p3 text-secondary '>{dateFormat}</p>
                         <p className='p3 text-secondary'>{WordCuter("999/2 thammasat u. clongluang cloungnueng pathumtani")}</p>
                    </div>
                </div>


                <img src={pinIcon} alt="" />
            </div>


            {/* PostSection */}
            <div className="post-section  ">
                <h2 className='text-primarydark'>{title}</h2>
                <p className='p2 text-secondary'>{detail}</p>

                <div className="price bg-primarydark w-[10rem] rounded-[16px] px-[1rem] py-[4px] flex items-center mt-[0.9rem] ">
                    <p className='text-accent '>{price}</p>
                </div>
            </div>
        </div>
    )
}

export default PostObject