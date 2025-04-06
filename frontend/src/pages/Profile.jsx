import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import profilePlaceHolder from '../assets/svg/profile_placeholder.svg'
import phone from '../assets/svg/phone.svg'
import pen from '../assets/svg/pen.svg'
import mail from '../assets/svg/gmail.svg'
import linepic from '../assets/svg/line.svg'





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
    <div className="home-container bg-primarylight flex flex-col items-center gap-[1rem] w-screen min-h-screen " >
      <div className="top-wrapper">
        <div className="profile-desc-wrapper flex flex-col items-center gap-[2rem] ">
          <div className="profile-wrapper  " style={{ marginTop: '6rem' }}>
            <img className='w-[13rem] h-[13rem] rounded-full object-cover ' src={data.profile_picture ? "/upload/" + data.profile_picture : profilePlaceHolder} alt="" />
          </div>

          <div className="name-desc-wrapper">
            <h2>{data.fname} {data.lname}</h2>
          </div>
        </div>

        <div className="space-wrapper" style={{ marginTop: '1rem' }}></div>

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
    </div>
  )
}

export default Profile