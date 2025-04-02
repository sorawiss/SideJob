import React from 'react';
import { Input } from "rizzui";
import { useState } from 'react';

import searchIcon from '../assets/svg/search-icon.svg';
import './Style/Home.css'


import Post from '../components/Post';
import Nav from '../components/Nav';
import NewPost from '../components/NewPost';


function Home() {
    const [onPost, setOnPost] = useState(false)


    const setCreatePost = () => {
        setOnPost(!onPost)
    }
    

    return (
        <div className='home-container bg-primarylight flex flex-col items-center gap-[1rem] w-screen '>
            <Input
                suffix= {<img src={searchIcon} />}
                placeholder="Search..."
                className=' w-[30rem] mt-[1.5rem]  '
                size='lg'
            />

            <Post />

            <Nav setCreatePost={setCreatePost} />

            {onPost ? <NewPost setCreatePost={setCreatePost} /> : null}
        </div>
    );
}

export default Home;
