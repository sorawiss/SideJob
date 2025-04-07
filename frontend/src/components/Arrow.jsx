import React from 'react'
import { useNavigate } from 'react-router-dom'


function Arrow({ className }) {

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <svg className='arrow size-[2rem] cursor-pointer' viewBox="0 0 49 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleGoBack}>
            <path d="M47 15L2 15M2 15L17.5 28M2 15L17.5 2" stroke="#1B1B1B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default Arrow