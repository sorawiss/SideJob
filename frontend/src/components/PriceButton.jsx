import React from 'react'

function PriceButton( {text} ) {
    return (
        <div className="price bg-primarydark w-[10rem] rounded-[16px] px-[1rem] py-[4px] flex items-center mt-[0.9rem] ">
            <p className='text-accent '>{text}</p>
        </div>
    )
}

export default PriceButton