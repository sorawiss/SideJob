import React from 'react'
import { useOutletContext } from 'react-router-dom'


import PostObject from './PostObject'


function Post() {

    const data = useOutletContext()

    
    return (
        <div className='post-grid-container bg-primarylight flex flex-col items-center gap-[1rem]  '>
            {data.map((items, index) =>
                <PostObject key={index} postDate={items.postDate} title={items.title} detail={items.details} price={items.salary} profilePic={items.members.profile_picture} fname={items.members.fname} lname={items.members.lname} category={items.category.name} location={items.location} rating={items.review} images={items.picture} postID={items.postID} posterID={items.posterID} isJob={items.isJob} />
            )}
        </div>

    )
}

export default Post