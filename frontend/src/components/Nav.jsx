import React from 'react'

export default function Nav( { setCreatePost } ) {
  return (


    <div className='nav-container fixed bottom-0 w-screen h-[3rem] bg-primarydark ' >
        <h2 className='text-primarylight cursor-pointer inline ' onClick={setCreatePost} >Post</h2>
    </div>
  )
}
