import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'

import WelcomeSVG from '../assets/svg/welcome1.svg'
import ButtonXL from '../components/ButtonXL'

function Welcome() {


    return (
        <div className='bg-accent h-screen p-[3.5rem] pt-[3.6rem] flex flex-col gap-[4.75rem] items-center '>

            {/* Welcome-SECTION */}
            <div className='welcome-container'>
                <h1 className='text-primary'>Welcome Message</h1>
            </div>


            {/* SVG */}
            <img src={WelcomeSVG} alt="" className='w-[20.5rem] ' />


            {/* Input-SECTION */}
            <div className="InputContainer flex flex-col items-center gap-[1rem] ">
                <Link to={'login'}><ButtonXL text='เข้าสู่ระบบ' /></Link>
                <Link to={'register'}><p className='text-[1.25rem] '>สมัครใช้งาน</p></Link>
            </div>


        </div>
    )
}

export default Welcome