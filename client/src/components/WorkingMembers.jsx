import React from 'react';
import { useQuery } from '@tanstack/react-query';

const baseURL = import.meta.env.VITE_BASE_URL;

const fetchWorkingMembers = async (postID) => {
  const response = await fetch(`${baseURL}/getInPosts/${postID}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

function WorkingMembers({ postID }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['workingMembers', postID],
    queryFn: () => fetchWorkingMembers(postID),
    enabled: !!postID,
  });

  if (isLoading) {
    return <div>Loading working members...</div>;
  }

  if (error) {
    return <div>Error loading working members: {error.message}</div>;
  }

  if (!data?.accept || data.accept.length === 0) {
    return <div>ไม่มีผู้ที่ร่วมงานนี้</div>;
  }

  // Filter accept records where status is true
  const acceptedMembers = data.accept.filter(item => item.status === true);
  
  if (acceptedMembers.length === 0) {
    return <div>ไม่มีผู้ที่ร่วมงานนี้</div>;
  }

  return (
    <div className="working-members-container flex flex-col gap-4 justify-center items-center ">
      <h2 className="b-4">ผู้ที่ทำงานนี้</h2>
      <div className="grid gap-4">
        {acceptedMembers.map((member) => (
          <div key={member.memberID} className="member-card bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <div className="profile-picture">
                <img 
                  src={member.members.profile_picture || '/default-avatar.png'} 
                  alt={`${member.members.fname}'s profile`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="member-info">
                <h4 className="font-medium">{member.members.fname} {member.members.lname}</h4>
                <div className="contact-info text-sm text-gray-600">
                  {member.members.phone_number && (
                    <p>Phone: {member.members.phone_number}</p>
                  )}
                  {member.members.line && (
                    <p>Line: {member.members.line}</p>
                  )}
                  {member.members.email && (
                    <p>Email: {member.members.email}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkingMembers; 