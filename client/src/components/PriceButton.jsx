import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import { Button } from "rizzui";


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
    catch(err) {
        console.log("Error in addAccept from client", err)
    }
}


function PriceButton( {text, isJob, postID, isAcceptedByCurrentUser } ) {

    const { currentUser } = useContext(AuthContext)

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
        }
    })
    


    function handleClick() {
        mutation.mutate( { postID, currentUser } )
    }


    return (
        <Button disabled={isAcceptedByCurrentUser} onClick={handleClick} className={`price min-w-[10rem] !border-none !w-fit rounded-[16px] px-[1rem] py-[4px] flex items-center mt-[0.9rem] justify-start ${isAcceptedByCurrentUser ? 'cursor-not-allowed bg-secondary' : 'cursor-pointer bg-primarydark'}`} >
            <p className={`${isJob ? "text-accent" : "text-white"} `}>{text} บาท {isAcceptedByCurrentUser && "(สมัครแล้ว)"}</p>
        </Button>
        
    )
}

export default PriceButton