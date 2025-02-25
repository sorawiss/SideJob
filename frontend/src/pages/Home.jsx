import React, { useEffect } from 'react'

function Home() {

  // useEffect
      useEffect (() => {
          const token = localStorage.getItem('token')
          
          async function checkToken () {
              const res = await fetch('http://localhost:3333/authentication', {
                  method: 'POST',
                  headers: {
                      'Content-Type' : 'application/json',
                      'Authorization' : 'Bearer ' +token
                  },
  
              })
              const responseFromAuth = await res.json()
              if (responseFromAuth.message === 'ok') {
              }
              
              else {
                alert('Please Login')
                window.location = '/login'
              }
          }

          checkToken()
      }, [])

  return (
    <div>Home</div>
  )
}

export default Home