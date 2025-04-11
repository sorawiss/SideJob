import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function DialogDefault({ reviewId }) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
    },
  })

  async function deleteReview(id) {
    const response = await fetch(
      `http://localhost:3333/deleteReview/${reviewId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
  }

  async function handleDelete() {
    try {
      await mutation.mutateAsync(id)
    } 
    catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete review. Please try again.");
    }
  }


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="text" className="text-right px-2 " >
        <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 1.5H10.5L9.5 0.5H4.5L3.5 1.5H0V3.5H14M1 16.5C1 17.0304 1.21071 17.5391 1.58579 17.9142C1.96086 18.2893 2.46957 18.5 3 18.5H11C11.5304 18.5 12.0391 18.2893 12.4142 17.9142C12.7893 17.5391 13 17.0304 13 16.5V4.5H1V16.5Z" fill="#616165" />
        </svg>
      </Button>
      <Dialog open={open} handler={handleOpen} className="flex flex-col items-center " >
        <DialogHeader>ต้องการลบรีวิวไหม?</DialogHeader>

        <DialogFooter>
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1"
          >
            <span className="text-2xl " >ไม่</span>
          </Button>
          <Button variant="gradient" onClick={() => {handleDelete(), handleOpen()}}>
            <span className="text-2xl ">ใช่</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}