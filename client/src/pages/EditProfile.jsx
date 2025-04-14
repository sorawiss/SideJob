import React, { use } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

import { Input } from "rizzui";
import { Button } from "rizzui";
import { Textarea } from "rizzui";

import Arrow from '../components/Arrow';
import EditProfilePicModal from '../components/EditProfilePicModal';



const baseUrl = import.meta.env.VITE_BASE_URL

function EditProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { login, logout, currentUser } = useContext(AuthContext);
  const [isLogingout, setIsLogingout] = useState(false);
  const [form, setForm] = useState({
    fname: '',
    lname: '',
    line: '',
    email: '',
    detail: ''
  });


  // useEffect
  useEffect(() => {
    if (currentUser) {
      setForm({
        fname: currentUser.fname || '',
        lname: currentUser.lname || '',
        line: currentUser.line || '',
        email: currentUser.email || '',
        detail: currentUser.detail || ''
      });
    }
  }, [currentUser]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const getUpdatedFields = (original, updated) => {
    const diff = {};
    for (const key in updated) {
      if (updated[key] !== original[key]) {
        diff[key] = updated[key];
      }
    }
    return diff;
  };


  async function updateData(updateData) {
    const response = await fetch(`${baseUrl}/editProfile/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    })

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    try {
      const localData = JSON.parse(localStorage.getItem('user'));
      const newData = { ...localData, ...updateData }
      console.log(newData);
      login(newData)
    }
    catch (error) {
      console.log("error while set new local storage" + error);
    }

    return await response.json();
  }


  // Logout function
  const handleLogout = async () => {
    setIsLogingout(true);
    await logout();
    setIsLogingout(false);
    navigate('/');
  }


  const mutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      console.log("Profile updated successfully");
      navigate(-1)
    },
    onError: (error) => {
      alert("Error: " + error.message);
    }
  });


  const handleSubmit = async () => {
    const updates = getUpdatedFields(currentUser, form);

    if (Object.keys(updates).length === 0) {
      console.log("No changes to save");
      return;
    }

    mutation.mutate(updates);

  }


  return (
    <div className="edit-profile-container flex flex-col items-center content-center py-[4rem] bg-primarylight min-h-screen px-[3rem] w-screen gap-[5rem] ">
      <div className="menu-wrapper w-[28rem] flex justify-between items-center ">
        <Arrow />
      </div>

      <div className="profile-wrapper  " >
        <EditProfilePicModal profile_picture={currentUser.profile_picture} />
      </div>

      <form className='edit-profile-form w-[18rem] flex flex-col gap-[1rem] items-center ' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <Input
          value={form.fname}
          label="ชื่อ"
          name='fname'
          onChange={handleChange}
        />
        <Input
          value={form.lname}
          label="นามสกุล"
          name='lname'
          onChange={handleChange}
        />
        <Input
          value={form.line}
          label="Line"
          name='line'
          onChange={handleChange}
        />
        <Input
          value={form.email}
          label="Email"
          name='email'
          onChange={handleChange}
        />
        <Textarea
          label="คำอธิบาย"
          name='detail'
          value={form.detail}
          onChange={handleChange}
          clearable
          onClear={() => { setForm((prev) => ({ ...prev, detail: ' '}))}}
        />
      </form>

      <Button onClick={handleSubmit} className='bg-primarydark text-white rounded-[16px] ' >Button</Button>

      <Button isLoading={isLogingout} onClick={handleLogout} >ออกจากระบบ</Button>

    </div>
  );
}

export default EditProfile;
