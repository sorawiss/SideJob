import { Switch } from "rizzui";

import React from 'react'
import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';



const baseUrl = import.meta.env.VITE_BASE_URL

function SwitchBtn({ PostID, status, posterID }) {
  // useState
  const [isOn, setIsOn] = useState(status);
  const queryClient = useQueryClient();

  // Fetch Function
  async function updateStatus(newStatus) {
    const res = await fetch(`${baseUrl}/switchPost/${PostID}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    return newStatus;
  }

  // Mutation
  const mutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: (newStatus) => {
      setIsOn(newStatus);
      queryClient.invalidateQueries({ queryKey: ['postList', posterID] });
    },
    onError: (error) => {
      console.error('Failed to update status:', error);
    },
  });


  const handleToggle = () => {
    const newStatus = !isOn;
    mutation.mutate(newStatus);
  };


  return < Switch
    defaultChecked={isOn}
    size="lg"
    label="ปิดโพสต์"
    switchClassName='bg-secondary '
    disabled={isLoading}
    onClick={handleToggle}
  />
}


export default SwitchBtn;