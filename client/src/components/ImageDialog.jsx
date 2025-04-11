import React from "react";
import {
  Dialog,
  DialogBody,
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
          alt="post picture"
          className="h-full w-full object-cover object-center "
          src={imgLink}
        />
      </Card>

      <Dialog className="dialog !w-fit !min-w-0  " open={open} handler={handleOpen}>
        <DialogBody className="dialog-body p-0 ">
          <img
            alt="nature"
            className="image max-h-[90vh] object-cover object-center"
            src={imgLink}
          />
        </DialogBody>
        
      </Dialog>
    </>
  );
}

export default ImageDialog;