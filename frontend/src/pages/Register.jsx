import React from 'react'

import { Input } from "rizzui";
import ButtonXL from '../components/ButtonXL';

function Register() {
    return (
        <div className='bg-primary h-screen flex flex-col pt-[6.5rem] gap-[7.5rem] '>
            <div className="logo-container">
                <h1 className='text-text-light'>LOGO</h1>
            </div>

            <div className="form-container flex flex-col items-center bg-accent w-full h-[42rem] rounded-tl-[90px] gap-[2.5rem] py-[4.375rem] ">
                <h1>Login</h1>
                <form action="" className='flex flex-col items-center gap-[2.5rem] border-none '>
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[16px]'
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        type='number'
                    />
                    <Input className='w-[22.5rem] h-[3.125rem] rounded-[32px]'
                        label="Password"
                        placeholder="Enter your passoword"
                        type='password'
                    />
                    <ButtonXL />

                    <p>Lorem ipsum dolor sit amet, login</p>
                </form>
            </div>
        </div>
    )
}

export default Register