import React, { useContext } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { Input, Password } from "rizzui";
import ButtonXL from '../components/ButtonXL';

import { AuthContext } from '../context/AuthContext';

function Login() {

    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userFound, setUserFound] = useState(null)
    const [checkPassword, setCheckPassword] = useState(null)


    // onSubmit Function
    async function handleSubmit(e) {
        e.preventDefault()
        const loginData = { phone_number: phoneNumber, password: password }

        // API Connection
        try {
            const response = await fetch('http://localhost:3333/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            })

            const data = await response.json();
            setUserFound(null)
            setCheckPassword(null)


            if (data.message === 'Login Success') {
                login(data.user)
                navigate('/home')
            }
            else if (data.message === 'No user found') {
                setUserFound('*ไม่มีบัญชีผู้ใช้นี้')
            }
            else if (data.message === 'WrongPassword') {
                setCheckPassword('*รหัสผ่านไม่ถูกต้อง')
            }

        }
        catch (error) {
            console.error("API Error in login API Connection:", error);
        }

    }


    // Frontend
    return (
        <div className='bg-primary h-screen flex flex-col items-center pt-[6.5rem] gap-[7.5rem] '>
            <div className="logo-container">
                <h1 className='text-light '>LOGO</h1>
            </div>

            <div className="form-container flex flex-col items-center bg-accent w-full h-[42rem] rounded-tl-[90px] gap-[2.5rem] py-[4.375rem] ">
                <h1 className='text-primary'>เข้าสู่ระบบ</h1>
                {/* Form */}
                <form action="" onSubmit={handleSubmit} className='flex flex-col items-center gap-[2.5rem] border-none '>
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[16px]'
                        label= {
                            <p>หมายเลขโทรศัพท์ <span className='error'>{userFound}</span></p>
                        }
                        placeholder="Enter your phone number"
                        type='number'
                        onChange={(e) => { setPhoneNumber(e.target.value) }}
                    />
                    <Password className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label= {
                            <p>รหัสผ่าน <span className='error'>{checkPassword}</span></p>
                        }
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <ButtonXL text='เข้าสู่ระบบ' />

                    <p>ยังไม่มีบัญขี <Link to={'/register'}><span className='highlight'>สมัคร</span></Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login