import {Link} from 'react-router-dom'

import WelcomeSVG from '../assets/svg/welcome1.svg'
import ButtonXL from '../components/ButtonXL'

import './Style/Welcome.css'

function Welcome() {


    return (
        <div className='deeped-bg-container min-h-screen '>
            
            <div className='welcome-container bg-accent min-h-screen p-[3.5rem] pt-[3.6rem] flex flex-col gap-[4.75rem] items-center '>

                {/* Welcome-SECTION */}
                <div className='text-container'>
                    <h1 className='text-primarydark'>Welcome Message</h1>
                    <h4 className='text-secondarydark'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.</h4>
                </div>


                {/* SVG */}
                <img src={WelcomeSVG} alt="" className='svg-container w-[20.5rem] ' />


                {/* Input-SECTION */}
                <div className="input-container flex flex-col items-center gap-[1rem] ">
                    <Link to={'login'}><ButtonXL text='เข้าสู่ระบบ' /></Link>
                    <Link to={'register'}><p className='text-[1.25rem] '>สมัครใช้งาน</p></Link>
                </div>

                <Link to={'home'}><p className='text-[1.25rem] text-secondary '>เข้าใช้งานโดยไม่ใช้บัญชี</p></Link>


            </div>

            <div className='right-container'>
                <h2 className='right-text'>sidejob</h2>
                {/* SVG */}
                <img src={WelcomeSVG} alt="" className='svg-container w-[20.5rem] '/>
            </div>
        </div>
        
    )
}

export default Welcome