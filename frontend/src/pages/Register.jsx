import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

import { Input, Password } from "rizzui";
import ButtonXL from '../components/ButtonXL';
import lock from '../assets/svg/lock-icon.svg'



function Register() {


    // Form collector variables
    const [fname, setFName] = useState('')
    const [lname, setLname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        phoneNumber: '',
        birthdate: '',
        password1: '',
        password2: ''
    });

    // Generic function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(formData)
    };



    // Form submit handle
    async function submitHandle(e) {
        e.preventDefault()
        const registerData = {
            fname: formData.fname,
            lname: formData.lname,
            phone_number: formData.phoneNumber,
            birthdate: formData.birthdate,
            password: formData.password2
        }

        try {
            const response = await fetch('http://localhost:3333/register', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(registerData)
            }
            )
            const data = await response.json()
            if (data.message == "RegisterSuccess") {
                localStorage.setItem('token', data.token)
                window.location = '/home'
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    // Password check
    const passwordError = password1 != password2 ? "*รหัสผ่านไม่ตรงกัน" : ""


    return (
        <div className='bg-primary h-screen flex flex-col items-center pt-[5.3rem] gap-[2.5rem] '>
            <div>
                <h1 className='text-light '>สมัครใช้งาน</h1>
            </div>

            <div className="form-container flex flex-col items-center bg-accent w-full h-full rounded-tl-[90px] gap-[2.5rem] py-[4.375rem] ">
                <form onSubmit={submitHandle} className='flex flex-col items-center gap-[2.5rem] border-none '>
                    <Input
                        className='w-[22.5rem] h-[3.125rem] rounded-[16px]'
                        label="ชื่อ"
                        placeholder="Enter your first name"
                        type='text'
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                    />

                    <Input
                        className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label="นามสกุล"
                        placeholder="Enter your last name"
                        type='text'
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                    />

                    <Input
                        className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label="เบอร์โทรศัพท์"
                        placeholder="Enter your phone number"
                        type='number'
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />

                    <Input
                        className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label="วัน/เดือน/ปี เกิด"
                        type='date'
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                    />

                    <Password
                        className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label="รหัสผ่าน"
                        placeholder="Enter your password"
                        name="password1"
                        value={formData.password1}
                        onChange={handleChange}
                        prefix={<img src={lock} />}
                    />

                    <Password
                        className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label={
                            <p>ยืนยันรหัสผ่าน <span className='error'>{formData.password1 !== formData.password2 ? "*รหัสผ่านไม่ตรงกัน" : ""}</span></p>
                        }
                        placeholder="Confirm your password"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        prefix={<img src={lock} />}
                    />

                    <ButtonXL text='สมัคร' />

                    <p>มีบัญชีแล้ว <Link to={'/login'}><span className='highlight'>เข้าสู่ระบบ</span></Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register