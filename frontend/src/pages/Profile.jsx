import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'



function Profile() {

  const { id } = useParams()

  const { isPending, error, data } = useQuery({
    queryKey: ['inPost', id],
    queryFn: () =>
      fetch('http://localhost:3333/getProfile/' + id).then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data)


  return (
    <div>Profile</div>
  )
}

export default Profile