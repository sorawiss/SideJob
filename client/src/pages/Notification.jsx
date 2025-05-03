import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'

import Nav from '../components/Nav';


const baseURL = import.meta.env.VITE_BASE_URL;

// Fetch Function
const fetchNotifications = async (userId) => {

  const response = await fetch(`${baseURL}/getAccept/${userId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log('Fetched Notifications (React Query):', data);
  return data;
};


// Main Component
function Notification() {
  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['notifications', id],
    queryFn: () => fetchNotifications(id),
    enabled: !!id,
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
        {data.map((items) => {
          return (
            <div key={items.postID + items.members.id} className="notification-block w-full bg-primarylight flex rounded-[16px] p-[0.5rem] gap-[1rem] items-center ">
              <div className="profile-wrapper size-[2.75rem] bg-backgrounddark rounded-full ">
                <img src="#" alt="" />
              </div>

              <div className="mesaage-wrapper">
                <p>{items.members.fname} {items.members.lname} ต้องการ{items.workPost.isJob ? 'สมัครงาน' : 'เข้าทำงาน'} งาน{items.workPost.title} ของคุณ</p>
              </div>
            </div>
          )

        })}
      </div>



      <Nav />
    </div>
  );
}

export default Notification;
