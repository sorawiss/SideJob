import React from 'react'

function ImageCropper() {
    return (
        <div className='image-cropper-container' >
            <label className="block mb-3 w-fit">
                <input
                    type="file"
                    accept="image/*"
                    className=""
                />
            </label>
        </div>
    )
}

export default ImageCropper