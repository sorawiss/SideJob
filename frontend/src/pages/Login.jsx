import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

import { Input } from "rizzui";
import ButtonXL from '../components/ButtonXL';
import eyes from '../assets/svg/eyes.svg'

function Login() {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='bg-primary h-screen flex flex-col items-center pt-[6.5rem] gap-[7.5rem] '>
            <div className="logo-container">
                <h1 className='text-light '>LOGO</h1>
            </div>

            <div className="form-container flex flex-col items-center bg-accent w-full h-[42rem] rounded-tl-[90px] gap-[2.5rem] py-[4.375rem] ">
                <h1 className='text-primary'>เข้าสู่ระบบ</h1>
                <form action="" className='flex flex-col items-center gap-[2.5rem] border-none '>
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[16px]'
                        label="หมายเลขโทรศัพท์"
                        placeholder="Enter your phone number"
                        type='number'
                    />
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label="รหัสผ่าน"
                        placeholder="Enter your passoword"
                        type={showPassword ? 'text' : 'password'}
                        suffix={<img
                            src={eyes}
                            alt="toggle password"
                            className={`cursor-pointer ${showPassword ? 'opacity-40' : 'opacity-100'}`}
                            onClick={(e) => {
                                e.preventDefault()
                                setShowPassword(!showPassword)
                            }}
                        />}
                    />
                    <ButtonXL text='เข้าสู่ระบบ' />

                    <p>ยังไม่มีบัญขี <Link to={'/register'}><span className='highlight'>สมัคร</span></Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login