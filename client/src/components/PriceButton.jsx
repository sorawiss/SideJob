import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from "rizzui";


const baseUrl = import.meta.env.VITE_BASE_URL


async function addAccept(param) {
    try {
        console.log(param)
        const res = await fetch(`${baseUrl}/addAccecpt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                postID: param.postID,
                memberID: param.memberID
            })
        })
        

        const data = await res.json()

        return data
    }   
    catch(err) {
        console.log("Error in addAccept from client", err)
    }
}


function PriceButton( {text, isJob, postID, memberID } ) {

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
        mutation.mutate( { postID, memberID } )
    }


    return (
        <Button onClick={handleClick} className="price bg-primarydark w-[10rem] rounded-[16px] px-[1rem] py-[4px] flex items-center mt-[0.9rem] justify-start " >
            <p className={`${isJob ? "text-accent" : "text-white"} `}>{text} บาท</p>
        </Button>
        
    )
}

export default PriceButton