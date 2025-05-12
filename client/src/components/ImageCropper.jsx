import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Button } from "rizzui";

// Function to create an image from the cropped area
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })

// Function to get the cropped image as a file
async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // Set canvas size to the desired crop size
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // Draw the cropped image onto the canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // Convert canvas to blob
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob)
    }, 'image/jpeg')
  })
}

function ImageCropper({ onImageCropped }) {
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImageSrc(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    try {
      setIsUploading(true)
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      
      // Create a file from the blob
      const file = new File([croppedImage], 'profile-picture.jpg', { type: 'image/jpeg' })
      
      // Create form data for upload
      const formData = new FormData()
      formData.append('images', file)
      
      // Upload to server
      const baseUrl = import.meta.env.VITE_BASE_URL
      const response = await fetch(`${baseUrl}/upload`, {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`)
      }
      
      const imageUrls = await response.json()
      
      // Extract the profile picture URL from the Cloudinary response
      // The URL is returned directly from the server
      const profilePicturePath = imageUrls[0]
      
      // Update user profile with the new profile picture
      // The profilePicturePath already contains the full Cloudinary URL path
      const updateResponse = await fetch(`${baseUrl}/editProfile`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile_picture: profilePicturePath
        })
      })
      
      if (!updateResponse.ok) {
        throw new Error(`Profile update failed with status: ${updateResponse.status}`)
      }
      
      // Update local storage with new profile picture
      try {
        const localData = JSON.parse(localStorage.getItem('user'))
        localData.profile_picture = profilePicturePath
        localStorage.setItem('user', JSON.stringify(localData))
      } catch (error) {
        console.error("Error updating local storage:", error)
      }
      
      // Call the callback function to notify parent component
      if (onImageCropped) {
        onImageCropped(profilePicturePath)
      }
      
      // Reload the page to show the updated profile picture
      window.location.reload()
      
    } catch (error) {
      console.error("Error uploading profile picture:", error)
      alert("Failed to upload profile picture. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='image-cropper-container flex flex-col gap-4'>
      {!imageSrc ? (
        <label className="block mb-3 w-fit cursor-pointer">
          <div className="bg-primarydark text-white py-2 px-4 rounded-lg">
            เลือกรูปโปรไฟล์
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onSelectFile}
          />
        </label>
      ) : (
        <>
          <div className="relative w-full h-[300px]">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
            />
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <label className="text-sm">ซูม:</label>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-1/2"
            />
          </div>
          
          <div className="flex justify-between gap-2 mt-4">
            <Button 
              onClick={() => setImageSrc(null)}
              className="bg-gray-200 text-gray-800"
            >
              ยกเลิก
            </Button>
            <Button 
              onClick={handleUpload}
              isLoading={isUploading}
              className="bg-primarydark text-white"
            >
              บันทึก
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default ImageCropper