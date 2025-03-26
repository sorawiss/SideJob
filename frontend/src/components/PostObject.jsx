import React from 'react'

import starIcon from '../assets/svg/star.svg'
import pinIcon from '../assets/svg/pin.svg'

function PostObject( {postDate, title, detail} ) {

    return (
        <div className='post-object-container w-[30rem] bg-white p-[1rem] rounded-[16px] flex flex-col gap-[0.9rem] '>
            {/* ProfileSection (Header) */}
            <div className="profile flex gap-[0.5rem] ">
                <img src="*" alt="" className='w-[2.6rem] h-[2.6rem] ' />

                <div className="profile-detail">
                    <div className="upper flex gap-[0.5rem] items-center ">
                        <p>Lionel Messi</p>

                        <div className="categary bg-accent px-[0.5rem] py-[1px] rounded-[16px] ">
                            Entertainment
                        </div>

                        <div className="rating">
                            <img src={starIcon} alt="" className='w-[1.2rem] h-[1.2rem] '/>
                        </div>
                    </div>


                    <div className="lower flex gap-[0.5rem] ">
                         <p className='p3 text-secondary '>{postDate}</p>
                         <p className='p3 text-secondary'>999/2 thammasat u. clongluang cloungnueng pathumtani</p>
                    </div>
                </div>


                <img src={pinIcon} alt="" />
            </div>


            {/* PostSection */}
            <div className="post-section">
                <h2 className='text-primarydark'>{title}</h2>
                <p className='p2 text-secondary'>{detail}</p>
            </div>
        </div>
    )
}

export default PostObject