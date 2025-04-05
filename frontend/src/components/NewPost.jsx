import React from 'react'
import { useState } from 'react';
import { Select } from "rizzui";
import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ProfileOnTop from './ProfileOnTop'

import { AuthContext } from '../context/AuthContext';

import arrow from '../assets/svg/arrow.svg'
import type from '../assets/svg/type.svg'
import picture from '../assets/svg/picture.svg'
import location from '../assets/svg/location.svg'
import phone from '../assets/svg/phone.svg'

function NewPost({ setCreatePost }) {

  const { currentUser } = useContext(AuthContext)

  const options = [
    { label: 'บันเทิง', value: '1' },
    { label: 'การเรียน', value: '2' },
    { label: 'ทำความสะอาด', value: '3' },
  ]

  const [value, setValue] = useState(null);

  const [formData, setFormData] = useState(
    {
      title: '',
      salary: '',
      details: '',
      categoryID: null
    }
  )

  console.log(currentUser)

  const handleSelectChange = (select) => {
    setValue(select);
    setFormData((prev) => ({
      ...prev,
      categoryID: select.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name] : value
    }));
  };


  async function createPost(postData) {
    const response = await fetch('http://localhost:3333/createPost', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    return await response.json();
  }


  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })



 
  async function submitHandle(e) {
    e.preventDefault()
    const postData = {
      title: formData.title,
      salary: formData.salary,
      details: formData.details,
      categoryID : formData.categoryID,
      posterID : currentUser.id
    }

    try {
      mutation.mutate(postData)
      console.log("add post to database success" + postData)
    }
    catch (error) {
      console.log(error)
    }
    setCreatePost()

  }


  return (
    <div className='new-post-container w-screen h-screen bg-secondary/55 fixed flex justify-center ' >
      <div className="new-post-content-wrapper  w-[30rem] flex flex-col gap-[3rem] bg-secondarylight p-[1.5rem] rounded-[16px] "  >


        <div className="arrow-wrapper">
          <img src={arrow} alt="" onClick={() => setCreatePost()} />
        </div>


        <div className="main-post-section-wrapper flex flex-col gap-[1rem] ">
          <ProfileOnTop />

          <textarea className='title-text h-[4.5rem] outline-none ' placeholder='หัวเรื่อง..' name='title' onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
            onChange={handleChange} />

          <div className="detail-wrapper w-[100%] flex flex-col gap-[1rem] items-center ">
            <div className="detail-input w-[100%] " >
              <textarea placeholder='รายละเอียด(ไม่บังคับ)...' className='bg-primarylight w-[100%] min-h-[12rem] rounded-[16px] p-[1rem] outline-none ' onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
                name='details'
                onChange={handleChange} />
            </div>

            <div className="add-more-detail flex gap-[2.5rem] ">
              <div className="more-detail-wrapper">
                <img src={type} alt="" />
                <Select
                  placeholder="ประเภท"
                  options={options}
                  value={value}
                  name='categoryID'
                  onChange={handleSelectChange}
                  selectClassName="ring-0 focus:ring-0 border-none "
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

        <div className="contact-wrapper">
          <p className='text-backgrounddark ' >การติดต่อ(ไม่บังคับ)</p>

          <div className="contact-input">
            <div className="more-detail-wrapper">
              <img src={phone} alt="" />
              <p className='p2 ' >{currentUser.phone_number}</p>
            </div>
          </div>
        </div>

        <div className="price-set bg-primarydark rounded-[16px] px-[1rem] py-[4px] mt-[0.9rem] ">
          <input type="number" placeholder='ราคา..' className='price-text outline-none ' onChange={handleChange} name='salary'  />
        </div>

        <button onClick={submitHandle} >Post</button>
      </div>
    </div>
  )
}

export default NewPost