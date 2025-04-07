import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate, Link } from 'react-router-dom'

import profilePlaceHolder from '../assets/svg/profile_placeholder.svg'
import phone from '../assets/svg/phone.svg'
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

  // Navigate back
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };


  // Get Profile
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

  const resultOfAvgRating = findAvg(data)



  return (
    <div className="home-container bg-primarylight flex flex-col items-center gap-[3rem] w-screen min-h-screen py-[4rem] " >

      <div className="top-wrapper w-[28rem] flex flex-col items-center gap-[2rem]  ">
        <div className="menu-wrapper w-full flex justify-between items-center ">
          <svg className='arrow size-[2rem] cursor-pointer' viewBox="0 0 49 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleGoBack}>
            <path d="M47 15L2 15M2 15L17.5 28M2 15L17.5 2" stroke="#1B1B1B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <Link to={'/editProfile/' + id} >
            <svg className='pencil stroke-primarydark size-[2rem] ' viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.393 12.8342L7.07371 50.1483C5.96411 51.2575 5.24209 52.6952 5.01499 54.2477L3 68L16.7552 65.9849C18.308 65.7568 19.7457 65.0334 20.8544 63.9224L58.1664 26.6083M44.393 12.8342L52.5149 4.70813C53.0563 4.1666 53.6991 3.73702 54.4065 3.44394C55.1139 3.15085 55.8721 3 56.6378 3C57.4036 3 58.1618 3.15085 58.8692 3.44394C59.5766 3.73702 60.2194 4.1666 60.7607 4.70813L66.292 10.2397C66.8335 10.7811 67.263 11.4239 67.5561 12.1313C67.8492 12.8388 68 13.597 68 14.3628C68 15.1286 67.8492 15.8868 67.5561 16.5943C67.263 17.3017 66.8335 17.9445 66.292 18.4859L58.1664 26.6083M44.393 12.8342L58.1664 26.6083" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

        </div>
        <div className="profile-desc-wrapper flex flex-col items-center gap-[2rem] ">
          <div className="profile-wrapper  " >
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
