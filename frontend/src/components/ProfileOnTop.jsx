import React from 'react'
import moment from 'moment'

function ProfileOnTop( { fname="Sorwiss", lname="Boonnee", date=new Date() } ) {
    return (
        <div>
            <div className="profile-wrapper flex  gap-[0.5rem] items-center ">
                <img src="*" alt="profile picture" className='w-[2.6rem] h-[2.6rem] ' />
                <p>{fname} {lname}</p>
                <p className='p2 text-secondary '>{moment(date).fromNow()}</p>
            </div>
        </div>
    )
}

export default ProfileOnTop