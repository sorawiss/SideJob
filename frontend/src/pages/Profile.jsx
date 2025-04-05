import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import profilePlaceHolder from '../assets/svg/profile_placeholder.svg'
import phone from '../assets/svg/phone.svg'
import pen from '../assets/svg/pen.svg'




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
          <div className="profile-wrapper  ">
            <img className='w-[13rem] h-[13rem] rounded-full object-cover ' src={data.profile_picture ? "/upload/" + data.profile_picture : profilePlaceHolder} alt="" />
          </div>

          <div className="name-desc-wrapper">
            <h2>{data.fname} {data.lname}</h2>
          </div>
        </div>

        <div className="contact-wrapper flex flex-col items-center ">
          <div className="phone-wrapper flex items-center gap-[0.5rem] ">
            <img src={phone} alt="Phone Icoon" className='inline ' />
            <p className='' > {data.phone_number} </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile