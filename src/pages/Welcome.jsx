import React from 'react'
import WelcomeSVG from '../assets/svg/welcome1.svg'
import { Button } from "rizzui";

function Welcome() {
    return (
        <div className='bg-accent h-screen p-[3.5rem] pt-[3.6rem] flex flex-col gap-[4.75rem] items-center '>

            {/* Welcome-SECTION */}
            <div className='welcome-container'>
                <h1>Welcome Message</h1>
            </div>


            {/* SVG */}
            <img src={WelcomeSVG} alt="" className='w-[20.5rem] ' />


            {/* Input-SECTION */}
            <div className="InputContainer flex flex-col items-center ">
                <Button variant='solid' className='w-[22.5rem] bg-background text-text-light text-[2.25rem] h-[3.5rem] rounded-[0.75rem] '>Button</Button>
                <p className='text-[1.25rem] '>Register</p>
            </div>


        </div>
    )
}

export default Welcome