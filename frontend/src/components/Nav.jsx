import React from 'react'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import plus from '../assets/svg/plus.svg'
import findWork from '../assets/svg/nav/findWork.svg'
import hire from '../assets/svg/nav/hire.svg'
import notification from '../assets/svg/nav/notification.svg'
import profile from '../assets/svg/nav/profile.svg'




export default function Nav({ setCreatePost, setPage }) {
  const { currentUser } = useContext(AuthContext)


  return (
    <div className='nav-container fixed bottom-0 w-screen h-[5rem] bg-primarydark ' >
      <div className="nav-items-container flex gap-[3rem] justify-center items-center ">
        <img src={findWork} alt="" className='cursor-pointer' onClick={() => setPage(true)} />
        <img src={hire} alt="" className='cursor-pointer' onClick={() => setPage(false)} />
        <img src={plus} alt="" className='cursor-pointer' onClick={setCreatePost} />
        <img src={notification} alt="" className='cursor-pointer' />
        <Link to={'/home/profile/'+ currentUser.id} ><img src={profile} alt="" className='cursor-pointer' /></Link>
      </div>

    </div>
  )
}
