import { Switch } from "rizzui";
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const baseUrl = import.meta.env.VITE_BASE_URL;

function SwitchBtn({ PostID, status, posterID }) {
  // Use local state to manage the switch, synced with the status prop
  const [isOn, setIsOn] = useState(status);

  const queryClient = useQueryClient();

  // Sync local state with status prop when it changes
  useEffect(() => {
    setIsOn(status);
  }, [status]);

  // Fetch Function
  async function updateStatus(newStatus) {
    const res = await fetch(`${baseUrl}/switchPost/${PostID}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
      console.log("Success update", newStatus);
      queryClient.invalidateQueries({ queryKey: ["profile", posterID] });
      queryClient.invalidateQueries({ queryKey: ["inPost", PostID] });
    },
    onError: (error) => {
      console.error("Failed to update status:", error);
      setIsOn(status);
    },
  });

  const handleToggle = () => {
    const newStatus = !isOn;
    setIsOn(newStatus);
    mutation.mutate(newStatus);
  };

  
  return (
    <Switch
      checked={!isOn} // Controlled component
      size="lg"
      label="ปิดโพสต์"
      switchClassName="bg-secondary"
      disabled={mutation.isPending}
      onChange={handleToggle}
    />
  );
}

export default SwitchBtn;