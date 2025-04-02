import React from 'react'
import { useState } from 'react';
import { Select } from "rizzui";

import ProfileOnTop from './ProfileOnTop'

import arrow from '../assets/svg/arrow.svg'
import type from '../assets/svg/type.svg'
import picture from '../assets/svg/picture.svg'
import location from '../assets/svg/location.svg'

function NewPost({ setCreatePost }) {

  const options = [
    { label: 'Apple 🍎', value: 'apple' },
    { label: 'Banana 🍌', value: 'banana' },
    { label: 'Cherry 🍒', value: 'cherry' },
  ]

  const [value, setValue] = useState(null);

  const [formData, setFormData] = useState(
    {
      title : '',
      
    }
  )



  return (
    <div className='new-post-container w-screen h-screen bg-secondary/55 fixed flex justify-center ' >
      <div className="new-post-content-wrapper  w-[30rem] flex flex-col gap-[3rem] bg-secondarylight p-[1.5rem] rounded-[16px] "  >


        <div className="arrow-wrapper">
          <img src={arrow} alt="" onClick={() => setCreatePost()} />
        </div>


        <div className="main-post-section-wrapper flex flex-col gap-[1rem] ">
          <ProfileOnTop />

          <textarea className='title-text h-[4.5rem] outline-none ' placeholder='หัวเรื่อง..' onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }} />

          <div className="detail-wrapper w-[100%] flex flex-col gap-[1rem] items-center ">
            <div className="detail-input w-[100%] " >
              <textarea placeholder='รายละเอียด(ไม่บังคับ)...' className='bg-primarylight w-[100%] min-h-[12rem] rounded-[16px] p-[1rem] outline-none ' onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`
              }} />
            </div>

            <div className="add-more-detail flex gap-[2.5rem] ">
              <div className="more-detail-wrapper">
                <img src={type} alt="" />
                <Select
                  placeholder="ประเภท"
                  options={options}
                  value={value}
                  onChange={setValue}
                  selectClassName = "ring-0 focus:ring-0 border-none "
                />
              </div>
              <div className="more-detail-wrapper">
                <img src={picture} alt="" />
                <p>รูปภาพ</p>
              </div>
              <div className="more-detail-wrapper">
                <img src={location} alt="" />
                <p>สถานที่</p>
              </div>


            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewPost