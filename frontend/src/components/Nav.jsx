import React from 'react'

import plus from '../assets/svg/plus.svg'

export default function Nav({ setCreatePost }) {
  return (


    <div className='nav-container fixed bottom-0 w-screen h-[3rem] bg-primarydark ' >
      <div className="nav-items-container flex gap-[3rem] justify-center items-center ">
        <h2 className='text-primarylight cursor-pointer ' >จ้างงาน</h2>
        <img src={plus} alt="" className='cursor-pointer'  onClick={setCreatePost} />
        <h2 className='text-primarylight cursor-pointer' >หางาน</h2>
      </div>

    </div>
  )
}
