import React, { useState, useContext } from 'react';
import { Select } from "rizzui";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { FileInput } from "rizzui";
import { Button } from "rizzui";

import ProfileOnTop from './ProfileOnTop'

import { AuthContext } from '../context/AuthContext';

import arrow from '../assets/svg/arrow.svg'
import phone from '../assets/svg/phone.svg'

import './style/NewPost.css'




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
  const [error, setError] = useState(null);
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
    if (!formData.categoryID) {
      setError('กรุณาเลือกหมวดหมู่')
      return
    }

    if (!formData.salary) {
      setError('กรุณากรอกราคา')
      return
    }

    if (!formData.title) {
      setError('กรุณากรอกหัวเรื่อง')
      return
    }

    setIsUploading(true)
    await handleUpload()
  }


  return (
    <div className='new-post-container w-screen h-screen bg-secondary/55 fixed flex justify-center ' >
      <div className="new-post-content-wrapper  w-[30rem] flex flex-col gap-[3rem] bg-white p-[1.5rem] rounded-[16px] "  >


        <div className="arrow-wrapper cursor-pointer ">
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

            <section className="quick-actions">
              <button>📍 สถานที่</button>
              <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#eee] w-[30%] rounded-[16px] p-[0.5rem] ">
                🖼️ รูปภาพ
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setSelectedFiles((prev) => [...prev, ...e.target.files] )
                  }}
                />
              </label>
              <Select
                placeholder="🏷️ หมวดหมู่"
                options={options}
                value={value}
                name='categoryID'
                onChange={handleSelectChange}
                selectClassName="ring-0 focus:ring-0 border-none !w-full "
              />
            </section>

          </div>
        </div>

        <div className="image-wrapper flex flex-wrap gap-2  "> {/* Added flex-wrap and gap for basic layout */}
          {selectedFiles.length > 0 &&
            selectedFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Selected file preview ${index + 1}`}
                className="w-30 h-30 object-cover rounded" 
              />
            ))}
        </div>


        {error && <p className="error">{error}</p>}

        <div className="button-wrapper flex flex-col gap-[1rem] ">
          <input name='salary' type="text" className="price-input" placeholder="ราคา" onChange={handleChange} />

          <Button isLoading={isUploading} onClick={submitHandle} className="submit-button">ประกาศ ✔</Button>
        </div>



      </div>
    </div>
  )
}

export default NewPost
