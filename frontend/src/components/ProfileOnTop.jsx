import React from 'react'
import moment from 'moment'

import profile from '../assets/svg/profile.svg'



function ProfileOnTop( { fname="Sorwiss", lname="Boonnee", profilePic } ) {
    return (
        <div>
            <div className="profile-wrapper flex  gap-[0.5rem] items-center content-center ">
                <img src={ profilePic ? "/upload/" + profilePic : profile } alt="" className='w-[3rem] h-[3rem] rounded-full object-cover ' />
                <p>{fname} {lname}</p>
                <p className='p2 text-secondary mt-[0.3rem] '>{moment().format('DD-MM-YY h:mm')}</p>
            </div>
        </div>
    )
}

export default ProfileOnTop