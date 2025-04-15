import { Switch } from "rizzui";
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const baseUrl = import.meta.env.VITE_BASE_URL;

function SwitchBtn({ PostID, status, posterID }) {
  // Use local state to manage the switch, synced with the status prop
  const [isOn, setIsOn] = useState(status);
  console.log("status from switch ", isOn);

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
    onMutate: async (newStatus) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ["inPost", PostID] });
      const previousPost = queryClient.getQueryData(["inPost", PostID]);
      queryClient.setQueryData(["inPost", PostID], (old) => ({
        ...old,
        status: newStatus,
      }));
      setIsOn(newStatus); // Update UI immediately
      return { previousPost };
    },
    onSuccess: (newStatus) => {
      console.log("Success update", newStatus);
      queryClient.invalidateQueries({ queryKey: ["profile", posterID] });
      queryClient.invalidateQueries({ queryKey: ["inPost", PostID] });
    },
    onError: (error, newStatus, context) => {
      console.error("Failed to update status:", error);
      queryClient.setQueryData(["inPost", PostID], context.previousPost);
      setIsOn(status); // Revert to prop status on error
    },
  });

  const handleToggle = () => {
    const newStatus = !isOn;
    console.log("new status", newStatus);
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