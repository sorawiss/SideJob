import React from 'react'

function PriceButton( {text, isJob} ) {
    return (
        <div className="price bg-primarydark w-[10rem] rounded-[16px] px-[1rem] py-[4px] flex items-center mt-[0.9rem] ">
            <p className={`${isJob ? "text-accent" : "text-white"} `}>{text}</p>
        </div>
    )
}

export default PriceButton