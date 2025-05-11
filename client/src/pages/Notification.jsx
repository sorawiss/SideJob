import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react';

import ConfirmDialog from '../components/ConfirmDialog';
import Nav from '../components/Nav';


const baseURL = import.meta.env.VITE_BASE_URL;

// Fetch Function
const fetchNotifications = async (userId) => {

  const response = await fetch(`${baseURL}/getAccept/${userId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};


// Set False
const setFalse = async ({ postID, memberID }) => {
  const response = await fetch(`${baseURL}/acceptSystem/setFalse`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postID, memberID }),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log('Set False (React Query):', data);
  return data;
};


// Main Component
function Notification() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['notifications', id],
    queryFn: () => fetchNotifications(id),
    enabled: !!id,
  });



  const mutation = useMutation({
    mutationFn: setFalse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', id] });
      setIsConfirmOpen(false);
    },
  });

  // Render loading state from React Query
  if (isLoading) {
    return <div>Loading notifications...</div>;
  }

  // isError is true if the queryFn throws an error
  if (isError) {
    return <div>Error fetching notifications: {error.message}</div>;
  }



  return (
    <div className="home-container bg-white flex flex-col items-center gap-[3rem] w-[28rem] m-auto min-h-screen py-[4rem] " >
      <div className="title-wrapper flex flex-col items-center gap-1 ">
        <svg width="58" height="61" viewBox="0 0 58 61" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29 0C23.0804 0 17.4032 2.36776 13.2174 6.58239C9.03154 10.797 6.67998 16.5133 6.67998 22.4737V33.8004C6.68044 34.2985 6.56582 34.7898 6.34518 35.2355L0.870394 46.2573C0.602957 46.7957 0.476675 47.3941 0.503543 47.9955C0.530412 48.597 0.709537 49.1815 1.02391 49.6936C1.33828 50.2057 1.77746 50.6284 2.29973 50.9216C2.822 51.2147 3.41002 51.3685 4.00795 51.3684H53.9921C54.59 51.3685 55.178 51.2147 55.7003 50.9216C56.2225 50.6284 56.6617 50.2057 56.9761 49.6936C57.2905 49.1815 57.4696 48.597 57.4965 47.9955C57.5233 47.3941 57.397 46.7957 57.1296 46.2573L51.658 35.2355C51.4363 34.7901 51.3206 34.2987 51.32 33.8004V22.4737C51.32 16.5133 48.9685 10.797 44.7826 6.58239C40.5968 2.36776 34.9196 0 29 0ZM29 61C27.021 61.001 25.0904 60.384 23.4743 59.234C21.8581 58.084 20.636 56.4576 19.9763 54.5789H38.0237C37.364 56.4576 36.1419 58.084 34.5257 59.234C32.9096 60.384 30.979 61.001 29 61Z" fill="#E5F066" />
        </svg>
        <h2>Notification</h2>

      </div>

      <div className="notification-container flex flex-col gap-[1rem] items-center ">
        {data?.map((items) => {
          return (
            <div key={items.postID + items.members.id} className="notification-block w-full bg-primarylight flex 
              rounded-[16px] p-[0.5rem] gap-[1rem] items-center ">
              <div className="profile-wrapper size-[2.75rem] bg-backgrounddark rounded-full ">
                <img src="#" alt="" />
              </div>

              <div className="mesaage-wrapper flex gap-[1rem] ">
                <p>{items.members.fname} {items.members.lname} ต้องการ{items.workPost.isJob ? 'สมัครงาน' : 'เข้าทำงาน'}
                  งาน{items.workPost.title} ของคุณ</p>

                <div className="button-wrapper flex gap-[0.5rem] ">
                  {/* Yes SVG */}
                  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className='cursor-pointer'
                  >
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 25.5C14.1415 25.5 15.767 25.1767 17.2835 24.5485C18.8001 23.9203 20.1781 22.9996 21.3388 21.8388C22.4996 20.6781 23.4203 19.3001 24.0485 17.7835C24.6767 16.267 25 14.6415 25 13C25 11.3585 24.6767 9.73303 24.0485 8.21646C23.4203 6.69989 22.4996 5.3219 21.3388 4.16116C20.1781 3.00043 18.8001 2.07969 17.2835 1.45151C15.767 0.823322 14.1415 0.5 12.5 0.5C9.18479 0.5 6.00537 1.81696 3.66117 4.16116C1.31696 6.50537 0 9.68479 0 13C0 16.3152 1.31696 19.4946 3.66117 21.8388C6.00537 24.183 9.18479 25.5 12.5 25.5ZM12.1778 18.0556L19.1222 9.72222L16.9889 7.94444L11.0167 15.1097L7.92639 12.0181L5.9625 13.9819L10.1292 18.1486L11.2042 19.2236L12.1778 18.0556Z" fill="#2E2E38" />
                  </svg>

                  {/* No SVG */}
                  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className='cursor-pointer'
                    onClick={() => {
                      setSelectedItem(items);
                      setIsConfirmOpen(true);
                    }}
                  >
                    <path d="M8 19.25L12.5 14.75L17 19.25L18.75 17.5L14.25 13L18.75 8.5L17 6.75L12.5 11.25L8 6.75L6.25 8.5L10.75 13L6.25 17.5L8 19.25ZM12.5 25.5C10.7708 25.5 9.14583 25.1717 7.625 24.515C6.10417 23.8583 4.78125 22.9679 3.65625 21.8437C2.53125 20.7196 1.64083 19.3967 0.985001 17.875C0.329168 16.3533 0.000834915 14.7283 1.58228e-06 13C-0.000831751 11.2717 0.327501 9.64666 0.985001 8.125C1.6425 6.60333 2.53292 5.28042 3.65625 4.15625C4.77958 3.03208 6.1025 2.14167 7.625 1.485C9.1475 0.828333 10.7725 0.5 12.5 0.5C14.2275 0.5 15.8525 0.828333 17.375 1.485C18.8975 2.14167 20.2204 3.03208 21.3437 4.15625C22.4671 5.28042 23.3579 6.60333 24.0162 8.125C24.6746 9.64666 25.0025 11.2717 25 13C24.9975 14.7283 24.6692 16.3533 24.015 17.875C23.3608 19.3967 22.4704 20.7196 21.3437 21.8437C20.2171 22.9679 18.8942 23.8587 17.375 24.5162C15.8558 25.1737 14.2308 25.5017 12.5 25.5Z" fill="#616165" />
                  </svg>
                </div>


              </div>
            </div>
          )

        })}
      </div>

      <ConfirmDialog 
        open={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)} 
        body="ต้องการปฏิเสธการร่วมงานหรือไม่" 
        onConfirm={() => {
          if (selectedItem) {
            mutation.mutate({ 
              postID: selectedItem.postID, 
              memberID: selectedItem.members.id 
            });
          }
        }} 
      />

      <Nav />
    </div>
  );
}

export default Notification;
