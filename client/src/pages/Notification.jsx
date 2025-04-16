import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'


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
    <div>
      <h1>Notifications</h1>
      
      {data.map((items) => {
        return (
          <p key={items.postID} >{items.members.fname} และ {items.workPost.title}</p>
        )

      })}
    </div>
  );
}

export default Notification;
