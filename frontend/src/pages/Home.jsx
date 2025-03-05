import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate()

  // useEffect
      useEffect (() => {
          async function checkToken () {
              const res = await fetch('http://localhost:3333/authentication', {
                  method: 'POST',
                  credentials: 'include',
              })

              
              const data = await res.json()
              if (data.message !== 'TokenConfirm') {
                console.log(data.message)
                alert('Please Login',);
                navigate('/login');
              }
          }

          checkToken()
      }, [])

  return (
    <div>Home</div>
  )
}

export default Home