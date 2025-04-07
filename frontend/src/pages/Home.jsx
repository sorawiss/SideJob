import React, { useEffect } from 'react';
import { Input } from "rizzui";
import { useState, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';



import searchIcon from '../assets/svg/search-icon.svg';
import './Style/Home.css'

import Nav from '../components/Nav';
import NewPost from '../components/NewPost';
import { AuthContext } from '../context/AuthContext';


function Home() {
    const [onPost, setOnPost] = useState(false)
    const [pageFindJob, setPageFindJob] = useState(true)
    const location = useLocation()

    const setCreatePost = () => {
        setOnPost(!onPost)
    }

    
    // Set PageFindJob to defind page we are in
    useEffect(() => {
        if (location.pathname === '/find') {
            setPageFindJob(true)
        }
        else if (location.pathname === '/hire') {
            setPageFindJob(false)
        }
    }, [location.pathname])
    

    const { currentUser } = useContext(AuthContext)


    return (
        <div className='home-container bg-primarylight flex flex-col items-center gap-[1rem] max-w-screen min-h-screen pb-[8rem] '>
            <Input
                suffix= {<img src={searchIcon} />}
                placeholder="Search..."
                className=' w-[30rem] mt-[1.5rem] '
                size='lg'
            />

            <Outlet />

            <Nav setCreatePost={setCreatePost} />

            {onPost ? <NewPost setCreatePost={setCreatePost} profilePic={currentUser.profile_picture} isJob={pageFindJob} /> : null}
        </div>
    );
}

export default Home;
