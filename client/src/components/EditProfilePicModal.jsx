import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import profilePlaceHolder from '../assets/svg/profile_placeholder.svg'
import ImageCropper from './ImageCropper'

import {
    Dialog,
    DialogBody,
} from "@material-tailwind/react"

function EditProfilePicModal({ profile_picture }) {
    const [open, setOpen] = useState(false)
    const { login } = useContext(AuthContext)
    
    const handleOpen = () => setOpen(!open)
    
    const handleImageCropped = (newProfilePicture) => {
        // Update the context with the new profile picture
        try {
            const localData = JSON.parse(localStorage.getItem('user'))
            if (localData) {
                const updatedUser = {
                    ...localData,
                    profile_picture: newProfilePicture
                }
                login(updatedUser)
            }
        } catch (error) {
            console.error("Error updating user context:", error)
        }
        
        // Close the dialog
        setOpen(false)
    }
    
    return (
        <div className='edit-profile-pic-container'>
            <img 
                onClick={handleOpen} 
                className='w-[13rem] h-[13rem] rounded-full object-cover object-center cursor-pointer'
                src={profile_picture ? profile_picture : profilePlaceHolder} 
                alt="Profile" 
            />

            <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
                <DialogBody className="space-y-4 pb-6">
                    <ImageCropper onImageCropped={handleImageCropped} />
                </DialogBody>
            </Dialog>
        </div>
    )
}

export default EditProfilePicModal