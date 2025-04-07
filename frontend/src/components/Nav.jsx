import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import plus from '../assets/svg/plus.svg'
import findWork from '../assets/svg/nav/findWork.svg'
import hire from '../assets/svg/nav/hire.svg'
import notification from '../assets/svg/nav/notification.svg'
import profile from '../assets/svg/nav/profile.svg'




export default function Nav({ setCreatePost, setPage, pageFindJob }) {
  const { currentUser } = useContext(AuthContext)


  return (
    <div className='nav-container fixed bottom-0 w-screen h-[5rem] bg-primarydark ' >
      <div className="nav-items-container flex gap-[3rem] justify-center items-center ">

        <svg className='cursor-pointer' onClick={() => setPage(true)} width="33" height="29" viewBox="0 0 33 29" fill="red" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.7 29C2.82 29 2.06693 28.7013 1.4408 28.1041C0.814667 27.5068 0.501067 26.7879 0.5 25.9474V9.15789C0.5 8.31842 0.8136 7.60003 1.4408 7.00274C2.068 6.40544 2.82107 6.10628 3.7 6.10526H10.1V3.05263C10.1 2.21316 10.4136 1.49477 11.0408 0.897474C11.668 0.300175 12.4211 0.00101754 13.3 0H19.7C20.58 0 21.3336 0.299158 21.9608 0.897474C22.588 1.49579 22.9011 2.21418 22.9 3.05263V6.10526H29.3C30.18 6.10526 30.9336 6.40442 31.5608 7.00274C32.188 7.60105 32.5011 8.31944 32.5 9.15789V25.9474C32.5 26.7868 32.1869 27.5057 31.5608 28.1041C30.9347 28.7024 30.1811 29.001 29.3 29H3.7ZM13.3 6.10526H19.7V3.05263H13.3V6.10526Z" fill="#F1F1F1" />
        </svg>

        <img src={hire} alt="" className='cursor-pointer' onClick={() => setPage(false)} />
        <img src={plus} alt="" className='cursor-pointer' onClick={setCreatePost} />
        <img src={notification} alt="" className='cursor-pointer' />
        <Link to={'/home/profile/' + currentUser.id} ><img src={profile} alt="" className='cursor-pointer' /></Link>
      </div>

    </div>
  )
}
