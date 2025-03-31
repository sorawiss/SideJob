import React from 'react'
import { useParams } from 'react-router-dom'

function InPost() {
  const { id } = useParams()
  console.log("PostID = " + id)

  return (
    <div>InPost</div>
  )
}

export default InPost