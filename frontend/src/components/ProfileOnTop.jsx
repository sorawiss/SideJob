import React from 'react'
import moment from 'moment'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import profile from '../assets/svg/profile.svg'
import DialogDefault from '../components/DialogDefault'



function ProfileOnTop({ fname = "Sorwiss", lname = "Boonnee", profilePic, id, reviewerID, date }) {

    const { currentUser } = useContext(AuthContext)
    
    return (
        <div className='profile-top  flex items-center justify-between  '>
            <div className="without-bin">
                <div className="profile-wrapper flex  gap-[0.5rem] items-center content-center ">
                    <img src={profilePic ? "/upload/" + profilePic : profile} alt="" className='w-[3rem] h-[3rem] rounded-full object-cover ' />
                    <p>{fname} {lname}</p>
                    <p className='p2 text-secondary mt-[0.3rem] '>{moment(date).format('DD-MM-YY h:mm')}</p>
                </div>
            </div>

            {currentUser.id === reviewerID ? <DialogDefault id={id} /> : null}


        </div>
    )
}

export default ProfileOnTop