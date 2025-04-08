import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import profilePlaceHolder from '../assets/svg/profile_placeholder.svg'

import { Input } from "rizzui";
import { Button } from "rizzui";

import Arrow from '../components/Arrow';




function EditProfile() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    line: '',
    email: '',
    detail: ''
  });


  const { isPending, error, data } = useQuery({
    queryKey: ['getIneditProfile', id],
    queryFn: () =>
      fetch(`http://localhost:3333/getProfile/${id}`).then((res) => res.json()),
  });

  if (isPending) return <Loading />;
  if (error) return 'An error has occurred: ' + error.message;

  console.log(data)


  async function updateData(updateData) {
    const response = await fetch('http://localhost:3333/adjustProfile/:id', {
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

    return await response.json();
  }


  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updatD,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return (
    <div className="edit-profile-container flex flex-col items-center content-center py-[4rem] bg-primarylight min-h-screen px-[3rem] w-screen gap-[5rem] ">
      <div className="menu-wrapper w-[28rem] flex justify-between items-center ">
        <Arrow />
      </div>

      <div className="profile-wrapper  " >
        <img className='w-[13rem] h-[13rem] rounded-full object-cover object-center ' src={data.profile_picture ? "/upload/" + data.profile_picture : profilePlaceHolder} alt="" />
      </div>

      <form className='edit-profile-form w-[18rem] flex flex-col gap-[1rem] items-center ' action="">
        <Input
          label="ชื่อ"
          placeholder={data.fname}
        />
        <Input
          label="นามสกุล"
          placeholder={data.lname}
        />
        <Input
          label="Line"
          placeholder={data.line}
        />
        <Input
          label="Email"
          placeholder={data.email}
        />
        <Input
          label="คำอธิบาย"
          placeholder={data.detail}
        />
      </form>

      <Button className='bg-primarydark text-white rounded-[16px] ' >Button</Button>

    </div>
  );
}

export default EditProfile;
