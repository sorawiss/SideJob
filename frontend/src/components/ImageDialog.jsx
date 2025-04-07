import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
 
function ImageDialog( { imgLink }) {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen((cur) => !cur);
 
  return (
    <>
      <Card
        className="w-full cursor-pointer overflow-hidden transition-opacity hover:opacity-90 rounded-none "
        onClick={handleOpen}
      >
        <img
          alt="nature"
          className="h-full w-full object-cover object-center "
          src={imgLink}
        />
      </Card>

       <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogBody className="p-0 "  >
          <img
            alt="nature"
            className="h-full w-full object-center"
            src={imgLink}
          />
        </DialogBody>
      </Dialog>
    </>
  );
}

export default ImageDialog;