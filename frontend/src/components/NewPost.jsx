import React from 'react'

import ProfileOnTop from './ProfileOnTop'

function NewPost( { setCreatePost  } ) {
  return (
    <div className='new-post-container w-screen h-screen bg-secondary/55 fixed ' onClick={setCreatePost} >
        <div className="new-post-content-wrapper  w-[25rem] flex flex-col gap-[3rem] m-auto bg-secondarylight "  >
            <ProfileOnTop />

            <input type="text" placeholder='หัวเรื่อง..' />
        </div>       
    </div>
  )
}

export default NewPost