import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

import { Input } from "rizzui";
import ButtonXL from '../components/ButtonXL';
import eyes from '../assets/svg/eyes.svg'



function Register() {

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    // Form collector variables
    const [fname, setFName] = useState('')
    const [lname, setLname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')


    // Form submit handle
    async function submitHandle (e) {
        e.preventDefault()
        const registerData = {fname : fname, lname : lname, phone_number : phoneNumber, password : password2}

        try {
            const response = await fetch ('http://localhost:3333/register', {
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(registerData)
            }
            )
            const data = await response.json()
            console.log("VAR")
            if (data.message == "Register success") {
                console.log(data)
                window.location = '/home'
            }
        }
        catch (error){
            console.log(error)
        }
    }


    // Password check
    const passwordError = password1 != password2 ? "รหัสผ่านไม่ตรงกัน" : ""


    return (
        <div className='bg-primary h-screen flex flex-col items-center pt-[5.3rem] gap-[2.5rem] '>
            <div>
                <h1 className='text-light '>สมัครใช้งาน</h1>
            </div>

            <div className="form-container flex flex-col items-center bg-accent w-full h-full rounded-tl-[90px] gap-[2.5rem] py-[4.375rem] ">
                <form onSubmit={submitHandle} className='flex flex-col items-center gap-[2.5rem] border-none '>
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[16px]'
                        label="ชื่อ"
                        placeholder="Enter your phone number"
                        type='text'
                        onChange={(e) => {setFName(e.target.value)}}
                    />
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label="นามสกุล"
                        placeholder="Enter your passoword"
                        type='text'
                        onChange={(e) => {setLname(e.target.value)}}
                    />
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label="เบอร์โทรศัพท์"
                        placeholder="Enter your passoword"
                        type='number'
                        onChange={(e) => {setPhoneNumber(e.target.value)}}
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
                        onChange={(e) => {setPassword1(e.target.value)}}
                    />
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label= {`ยืนยันรหัสผ่าน ${passwordError}`}
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
                        onChange={(e) => {setPassword2(e.target.value)}}
                    />
                    <ButtonXL text='สมัคร' />

                    <p>มีบัญชีแล้ว <Link to={'/login'}><span className='highlight'>เข้าสู่ระบบ</span></Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register