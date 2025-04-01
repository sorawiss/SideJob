import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import InPostObject from '../components/InPostObject'



function InPost() {
  const { id } = useParams()
  console.log("PostID = " + id)


  const { isPending, error, data } = useQuery({
    queryKey: ['inPost', id],
    queryFn: () =>
      fetch('http://localhost:3333/getInPosts/' + id).then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data)
  


  return (
    <div className='inPost-container flex flex-col items-center bg-primarylight min-h-screen '>
      <InPostObject {...data} />
    </div>
  )
}

export default InPost