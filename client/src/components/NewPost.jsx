import React, { useState, useContext } from 'react';
import { Select } from "rizzui";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { FileInput } from "rizzui";
import { Button } from "rizzui";

import ProfileOnTop from './ProfileOnTop'

import { AuthContext } from '../context/AuthContext';

import arrow from '../assets/svg/arrow.svg'
import type from '../assets/svg/type.svg'
import picture from '../assets/svg/picture.svg'
import location from '../assets/svg/location.svg'
import phone from '../assets/svg/phone.svg'




const baseUrl = import.meta.env.VITE_BASE_URL
function NewPost({ isJob }) {

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const options = [
    { label: '✨ บันเทิง', value: '1' },
    { label: '🎓 การเรียน', value: '2' },
    { label: '🧹 ทำความสะอาด', value: '3' },
  ]

  const [value, setValue] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState(
    {
      title: '',
      salary: '',
      details: '',
      categoryID: null
    }
  )


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
      [name]: value
    }));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch(`${baseUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const fileNames = await response.json();
        handleCreatePost(fileNames);
      } else {
        console.error('File upload failed');
      }
    } 
    catch (error) {
      console.error('Error uploading files:', error);
    }
  };



  async function createPost(postData) {
    const response = await fetch(`${baseUrl}/createPost`, {
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
      setIsUploading(false)
      navigate(-1)
    },
  })



  const handleCreatePost = async (fileNames) => {
    const postData = {
      title: formData.title,
      salary: formData.salary,
      details: formData.details,
      categoryID: formData.categoryID,
      posterID: currentUser.id,
      isJob: isJob,
      images: fileNames, // Include the file names here
    }

    try {
      mutation.mutate(postData)
      console.log("Post Data", postData)
    }
    catch (error) {
      console.log(error)
    }
  }



  async function submitHandle(e) {
    e.preventDefault()
    setIsUploading(true)
    await handleUpload()
  }


  return (
    <div className='new-post-container w-screen h-screen bg-secondary/55 fixed flex justify-center ' >
      <div className="new-post-content-wrapper  w-[30rem] flex flex-col gap-[3rem] bg-secondarylight p-[1.5rem] rounded-[16px] "  >


        <div className="arrow-wrapper">
          <img src={arrow} alt="" onClick={() => navigate(-1)} />
        </div>


        <div className="main-post-section-wrapper flex flex-col gap-[1rem] ">
          <ProfileOnTop profilePic={currentUser.profile_picture} fname={currentUser.fname} lname={currentUser.lname} />

          <textarea className='title-text h-[4.5rem] outline-none resize-none ' placeholder='หัวเรื่อง..' name='title' onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
            onChange={handleChange} />

          <div className="detail-wrapper w-[100%] flex flex-col gap-[1rem] items-start ">
            <div className="detail-input w-[100%] " >
              <textarea placeholder='รายละเอียด(ไม่บังคับ)...' className='detail-placeholder bg-primarylight resize-none w-[100%] min-h-[5rem] rounded-[16px] p-[1rem] outline-none ' onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
                name='details'
                onChange={handleChange} />
            </div>

            <div className="add-more-detail-section flex flex-col gap-[1.5rem] ">
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
                <FileInput
                  name='images'
                  multiple
                  inputClassName="ring-0 border-none "
                  onChange={(e) => setSelectedFiles([...e.target.files])}
                  accept='image/*'
                />
              </div>
              <div className="more-detail-wrapper">
                <img src={location} alt="" />
                <p>สถานที่</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-wrapper flex flex-col gap-[1rem]">
          <p className='text-backgrounddark ' >การติดต่อ(ไม่บังคับ)</p>

          <div className="contact-input">
            <div className="more-detail-wrapper">
              <img src={phone} alt="" />
              <p className='p2 ' >{currentUser.phone_number}</p>
            </div>
          </div>
        </div>

        <div className="price-set bg-primarydark rounded-[16px] px-[1rem] py-[4px] mt-[0.9rem] ">
          <input type="number" placeholder='ราคา..' className='price-text outline-none ' onChange={handleChange} name='salary' />
        </div>

        <Button isLoading={isUploading}  onClick={submitHandle} className='text-3xl text-accent bg-primarydark rounded-[16px] p-[2rem] ' >ยืนยัน</Button>
      </div>
    </div>
  )
}

export default NewPost
