import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import profilePlaceHolder from '../assets/svg/profile_placeholder.svg'
import phone from '../assets/svg/phone.svg'
import pen from '../assets/svg/pen.svg'
import mail from '../assets/svg/gmail.svg'
import linepic from '../assets/svg/line.svg'

import PostObject from '../components/PostObject'
import ShowRating from '../components/ShowRating'



function findAvg(data) {
  if (data.workPost.length === 0) return 0
  let sum = 0
  let count = 0
  data.workPost.forEach((workPost) => {
    workPost.review.forEach((review) => {
      sum += review.rating
      count++
    })
  })

  return {
    avg: (sum / count).toFixed(1),
    count: count
  }
}



function Profile() {

  const { id } = useParams()



  // Get Profile
  const { isPending, error, data } = useQuery({
    queryKey: ['inPost', id],
    queryFn: () =>
      fetch('http://localhost:3333/getProfile/' + id).then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const resultOfAvgRating = findAvg(data)



  return (
    <div className="home-container bg-primarylight flex flex-col items-center gap-[1rem] w-screen min-h-screen " >
      <div className="top-wrapper">
        <div className="profile-desc-wrapper flex flex-col items-center gap-[2rem] ">
          <div className="profile-wrapper  " style={{ marginTop: '6rem' }}>
            <img className='w-[13rem] h-[13rem] rounded-full object-cover object-center ' src={data.profile_picture ? "/upload/" + data.profile_picture : profilePlaceHolder} alt="" />
          </div>

          <div className="name-desc-wrapper">
            <h2>{data.fname} {data.lname}</h2>
          </div>
        </div>

        <div className="contact-wrapper flex flex-col items-center gap-[0.5rem] ">
          <div className="phone-wrapper flex items-center gap-[0.5rem] ">
            <img src={phone} alt="Phone Icon" className='inline ' />
            <p className='' > {data.phone_number} </p>
          </div>
          <div className="line-wrapper flex items-center gap-[0.5rem] ">
            <img src={linepic} alt="Line Icon" className='inline ' />
            <p className='' > {data.fname}{data.phone_number}Line </p>
          </div>
          <div className="email-wrapper flex items-center gap-[0.5rem] ">
            <img src={mail} alt="Email Icon" className='inline ' />
            <p className='' > {data.fname}@gmail.com </p>
          </div>
        </div>
      </div>

      
      <ShowRating avgRating={resultOfAvgRating.avg} numberOfRating={resultOfAvgRating.count} />

      <div className='post-grid-container bg-primarylight flex flex-col items-center gap-[1rem]  '>
        {data.workPost.length > 0 ? (
          data.workPost.map((items) => (
            <PostObject
              key={items.postID}
              posterID={items.id}
              postDate={items.postDate}
              title={items.title}
              detail={items.details}
              price={items.salary}
              profilePic={data.profile_picture}
              fname={data.fname}
              lname={data.lname}
              category={items.category.name}
              location={items.location}
              rating={items.review}
              images={items.picture}
              postID={items.postID}
              isJob={items.isJob}
            />

          ))
        ) : (
          <p className="text-secondary ">ยังไม่มีโพสต์</p>
        )}
      </div>
    </div>
  )
}

export default Profile