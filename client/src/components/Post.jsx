import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';

import Loading from './Loading';

import PostObject from './PostObject'



const baseUrl = import.meta.env.VITE_BASE_URL
function Post( { isJob } ) {
    const search = useOutletContext()
    
    // Get Posts
    const { isPending, error, data } = useQuery({
        queryKey: ['posts', isJob],
        queryFn: () =>
            fetch(`${baseUrl}/getPosts?category=${isJob}`, {
                credentials: 'include',
            }).then((res) =>
                res.json()
            )
    })

    if (isPending) return <Loading />
    if (error) return 'An error has occurred: ' + error.message


    // Filter data
    let filterData = {}
    if (search == '') {
        filterData = data
    }
    else {
        filterData = data.filter((items) => {
            return items.title.toLowerCase().includes(search.toLowerCase()) ||
                items.details.toLowerCase().includes(search.toLowerCase()) ||
                items.members.fname.toLowerCase().includes(search.toLowerCase()) ||
                items.members.lname.toLowerCase().includes(search.toLowerCase())
        })
    }



    return (
        <div className='post-grid-container bg-primarylight flex flex-col items-center gap-[1rem]  '>
            {filterData.map((items) =>
                <PostObject key={items.postID} postDate={items.postDate} title={items.title} detail={items.details} price={items.salary} profilePic={items.members.profile_picture} fname={items.members.fname} lname={items.members.lname} category={items.category.name} location={items.location} rating={items.review} images={items.picture} postID={items.postID} posterID={items.posterID} isJob={items.isJob} />
            )}
        </div>

    )
}

export default Post