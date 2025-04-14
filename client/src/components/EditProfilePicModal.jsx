import React from 'react'

import profilePlaceHolder from '../assets/svg/profile_placeholder.svg'

import ImageCropper from './ImageCropper';


import {
    Input,
    Dialog,
    Typography,
    DialogBody,
} from "@material-tailwind/react";



function EditProfilePicModal({ profile_picture }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <div className='edit-profile-pic-container'>
            <img onClick={handleOpen} className='w-[13rem] h-[13rem] rounded-full object-cover object-center '
                src={profile_picture ? "/upload/" + profile_picture : profilePlaceHolder} alt="" />


            <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
                <DialogBody className="space-y-4 pb-6">
                    <ImageCropper />

                </DialogBody>
            </Dialog>
        </div>
    )
}

export default EditProfilePicModal