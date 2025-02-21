import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

import { Input } from "rizzui";
import ButtonXL from '../components/ButtonXL';
import eyes from '../assets/svg/eyes.svg'



function Register() {

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);


    return (
        <div className='bg-primary h-screen flex flex-col items-center pt-[5.3rem] gap-[2.5rem] '>
            <div>
                <h1 className='text-light '>สมัครใช้งาน</h1>
            </div>

            <div className="form-container flex flex-col items-center bg-accent w-full h-full rounded-tl-[90px] gap-[2.5rem] py-[4.375rem] ">
                <form action="" className='flex flex-col items-center gap-[2.5rem] border-none '>
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[16px]'
                        label="ชื่อ"
                        placeholder="Enter your phone number"
                        type='text'
                    />
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label="นามสกุล"
                        placeholder="Enter your passoword"
                        type='text'
                    />
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label="เบอร์โทรศัพท์"
                        placeholder="Enter your passoword"
                        type='number'
                    />
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label="ตั้งรหัสผ่าน"
                        placeholder="Enter your passoword"
                        type={showPassword1 ? 'text' : 'password'}
                        suffix={<img
                            src={eyes}
                            alt="toggle password"
                            className={`cursor-pointer ${showPassword1 ? 'opacity-40' : 'opacity-100'}`}
                            onClick={(e) => {
                                e.preventDefault()
                                setShowPassword1(!showPassword1)
                            }}
                        />}
                    />
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label="ยืนยันรหัสผ่าน"
                        placeholder="Enter your passoword"
                        type={showPassword2 ? 'text' : 'password'}
                        suffix={<img
                            src={eyes}
                            alt="toggle password"
                            className={`cursor-pointer ${showPassword2 ? 'opacity-40' : 'opacity-100'}`}
                            onClick={(e) => {
                                e.preventDefault()
                                setShowPassword2(!showPassword2)
                            }}
                        />}
                    />
                    <ButtonXL text='สมัคร' />

                    <p>มีบัญชีแล้ว <Link to={'/login'}><span className='highlight'>เข้าสู่ระบบ</span></Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register