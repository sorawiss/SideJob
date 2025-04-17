import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Button } from "rizzui";

import ConfirmDialog from './ConfirmDialog';


const baseUrl = import.meta.env.VITE_BASE_URL


async function addAccept(param) {
    try {
        const res = await fetch(`${baseUrl}/addAccecpt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                postID: param.postID,
                memberID: param.currentUser.id
            })
        })


        const data = await res.json()

        return data
    }
    catch (err) {
        console.log("Error in addAccept from client", err)
    }
}


function PriceButton({ text, isJob, postID, isAcceptedByCurrentUser }) {

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const queryClient = useQueryClient()


    const mutation = useMutation({
        mutationFn: addAccept,
        onSuccess: (data) => {
            console.log("Add Accept Success from client", data)
            queryClient.invalidateQueries(['inPost', String(postID)])
        },
        onError: (err) => {
            console.log("Add Accept Error", err)
        },
        onSettled: () => {
            console.log("Mutation finish")
            setIsConfirmOpen(false);
        }
    })


    function handleOpenConfirm() {
        if (!isAcceptedByCurrentUser && !mutation.isPending) {
            setIsConfirmOpen(true);
        }
    }

    function handleCloseConfirm() {
        setIsConfirmOpen(false);
    }

    function handleConfirmAction() {
        mutation.mutate({ postID, currentUser });
    }

    function handleNavigate() {
        navigate('/')
    }


    return (
        <>
            <Button disabled={isAcceptedByCurrentUser} onClick={currentUser ? handleOpenConfirm : handleNavigate} className={`price min-w-[10rem] !border-none !w-fit rounded-[16px] px-[1rem] py-[4px] flex items-center mt-[0.9rem] justify-start ${isAcceptedByCurrentUser ? 'cursor-not-allowed bg-secondary' : 'cursor-pointer bg-primarydark'}`} >
                <p className={`${isJob ? "text-accent" : "text-white"} `}>{text} บาท {isAcceptedByCurrentUser && "(สมัครแล้ว)"}</p>
            </Button>

            <ConfirmDialog
                open={isConfirmOpen}
                onClose={handleCloseConfirm}
                onConfirm={handleConfirmAction}
                body={"เมื่อกดสมัครแล้วคุณจะไม่สามารถยกเลิกได้"}
            />
        </>



    )
}

export default PriceButton