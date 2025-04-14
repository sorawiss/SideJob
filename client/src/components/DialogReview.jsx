import React from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query'

const baseUrl = import.meta.env.VITE_BASE_URL


import {
    Dialog,
    DialogBody,
} from "@material-tailwind/react";

import { useState } from "react";

import RateStar from "./RateStar";

export default function DialogReview({ reviewerID, postID, posterID, }) {
    const [open, setOpen] = React.useState(false);
    const [rating, setRating] = useState(0);

    const handleOpen = () => setOpen(!open);


    const [detail, setDetail] = useState('')

    async function createReview(reviewData) {
        const response = await fetch(`${baseUrl}/createReview`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData)
        }
        )

        if (!response.ok) {
            const message = `An error has occured in fetch createReview: ${response.status}`
            throw new Error(message)
        }

        return await response.json()

    }


    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comment'] })
            setRating(0)
            setDetail('')
            handleOpen()
        },
    })


    function submitHandle(e) {
        e.preventDefault()
        const createReviewData = {
            postID: postID,
            reviewedID: posterID,
            reviewerID: reviewerID,
            rating: rating,
            reviewDetails: detail,
        }
        try {
            mutation.mutate(createReviewData)
        }
        catch (error) {
            console.log(error)
        }
    }

    
    return (
        <>
            <div onClick={handleOpen} className="rate-readonly-wrapper">
                <RateStar rating={rating} readonly={true}  onClick={handleOpen} />
            </div>

            <Dialog className="dialog-wrapper !min-w-0 !w-fit " open={open} handler={handleOpen}>
                <DialogBody className="dialog-body-wrapper" >
                    <div className="rate-wrapper min-h-[29rem] w-[25rem] bg-white rounded-[16px] py-[6rem] flex flex-col items-center gap-[2rem] ">
                        <RateStar rating={rating} setRating={setRating} />

                        <div className="detail-input" >
                            <textarea placeholder='รายละเอียด(ไม่บังคับ)...' className='bg-primarylight resize-none w-[17rem] min-h-[12rem] rounded-[16px] p-[1rem] outline-none ' onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`
                            }}
                                onChange={(e) => setDetail(e.target.value)}
                            />
                        </div>

                        <button onClick={submitHandle} >Post</button>
                    </div>

                </DialogBody>

            </Dialog>
        </>
    );
}