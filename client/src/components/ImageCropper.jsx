import React from 'react'



function ImageCropper() {

    function onSelectFile(e) {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
    }

    return (
        <div className='image-cropper-container' >
            <label className="block mb-3 w-fit">
                <input
                    type="file"
                    accept="image/*"
                    className=""
                    onChange={onSelectFile}
                />
            </label>
        </div>
    )
}

export default ImageCropper