import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import InPostObject from '../components/InPostObject'

function InPost() {
  const { id } = useParams()

  const {
    isPending: isPostPending,
    error: postError,
    data: postData,
  } = useQuery({
    queryKey: ['inPost', id],
    queryFn: () =>
      fetch('http://localhost:3333/getInPosts/' + id).then((res) =>
        res.json(),
      ),
  })

  const {
    isPending: isReviewsPending,
    error: reviewsError,
    data: reviewsData,
  } = useQuery({
    queryKey: ['comment', id],
    queryFn: () =>
      fetch('http://localhost:3333/getReviews/' + id).then((res) =>
        res.json(),
      ),
  })

  
  if (isPostPending || isReviewsPending) return 'Loading...'

  if (postError || reviewsError) return 'An error has occurred: in InPost query '

  return (
    <div className='inPost-container flex flex-col items-center bg-primarylight min-h-screen '>
      { postData && reviewsData && <InPostObject {...postData} review={reviewsData} /> }
    </div>
  )

}




export default InPost
