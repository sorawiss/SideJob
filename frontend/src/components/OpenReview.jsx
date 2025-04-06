import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'



import RateStar from './RateStar'

function OpenReview({ rating, setRating, postID, posterID }) {

    const { currentUser } = useContext(AuthContext)
    
    const [detail, setDetail] = useState('')
    

    async function createReview(reviewData) {
        const response = await fetch('http://localhost:3333/createReview', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData)
        }
        )

        if (!response.ok) {
            const message = `An error has occured in fetch createReview: ${response.status}`
            throw new Error(message)
        }

        console.log("fect api success", response)
        return await response.json()

    }

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comment'] })
            setRating(0)
        },
    })


    function submitHandle(e) {
        e.preventDefault()
        const createReviewData = {
            postID : postID,
            reviewedID : posterID,
            reviewerID : currentUser.id,
            rating : rating,
            reviewDetails : detail, 
        }
        try {
            mutation.mutate(createReviewData)
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="open-review-container fixed h-screen w-screen bg-secondary/55 flex justify-center items-center bottom-0 left-0 "
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setRating(0)
                }
            }
            }
        >
            <div className="rate-wrapper min-h-[29rem] w-[25rem] bg-white rounded-[16px] py-[16rem] flex flex-col items-center gap-[2rem] ">
                <RateStar rating={rating} setRating={setRating} />

                <div className="detail-input" >
                    <textarea placeholder='รายละเอียด(ไม่บังคับ)...' className='bg-primarylight resize-none w-[17rem] min-h-[12rem] rounded-[16px] p-[1rem] outline-none ' onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`
                    }}
                        onChange={(e) => setDetail(e.target.value)}
                         />
                </div>

                <button onClick={submitHandle} >Post</button>
            </div>

        </div>
    )
}

export default OpenReview