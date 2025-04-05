import React from 'react';
import { Input } from "rizzui";
import { useState, useContext } from 'react';

import searchIcon from '../assets/svg/search-icon.svg';
import './Style/Home.css'


import Post from '../components/Post';
import Nav from '../components/Nav';
import NewPost from '../components/NewPost';
import { AuthContext } from '../context/AuthContext';


function Home() {
    const [onPost, setOnPost] = useState(false)
    const [pageFindJob, setPageFindJob] = useState(true)

    const setCreatePost = () => {
        setOnPost(!onPost)
    }

    const setPage = (bool) => {
        setPageFindJob(bool)
    }
    

    const { currentUser } = useContext(AuthContext)


    return (
        <div className='home-container bg-primarylight flex flex-col items-center gap-[1rem] w-screen min-h-screen '>
            <Input
                suffix= {<img src={searchIcon} />}
                placeholder="Search..."
                className=' w-[30rem] mt-[1.5rem]  '
                size='lg'
            />

            <Post pageFindJob={pageFindJob} />

            <Nav setCreatePost={setCreatePost} setPage={setPage} />

            {onPost ? <NewPost setCreatePost={setCreatePost} profilePic={currentUser.profile_picture} isJob={pageFindJob} /> : null}
        </div>
    );
}

export default Home;
