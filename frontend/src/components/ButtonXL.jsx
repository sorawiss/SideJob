import React from 'react'
import { Button } from "rizzui";

function ButtonXL({text = 'Text'}) {
  return (
    <Button type='submit' variant='solid' className='w-[22.5rem] bg-background text-light text-[2.25rem] h-[3.5rem] rounded-[0.75rem] cursor-pointer '>{text}</Button>
  )
}

export default ButtonXL