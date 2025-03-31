import React from 'react'
import { useQuery } from '@tanstack/react-query'


import PostObject from './PostObject'


function Post() {

    const { isPending, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: () =>
            fetch('http://localhost:3333/getPosts', {
                credentials: 'include',
            }).then((res) =>
                res.json()
            ),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    console.log(data)


    return (
        <div className='post-grid-container bg-primarylight flex flex-col items-center gap-[1rem]  '>
            {data.map((items, index) =>
                <PostObject key={index} postDate={items.postDate} title={items.title} detail={items.details} price={items.salary} fname={items.members.fname} lname={items.members.lname} category={items.category.name} location={items.job?.workPlaceAddress || 'ไม่ระบุ'} rating={items.review} images={items.picture} />
            )}
        </div>

    )
}

export default Post