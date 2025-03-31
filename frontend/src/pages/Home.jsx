import React from 'react';
import { Input } from "rizzui";
import searchIcon from '../assets/svg/search-icon.svg';
import './Style/Home.css'


import Post from '../components/Post';

function Home() {
    return (
        <div className='bg-primarylight flex flex-col items-center gap-[1rem] w-screen h-screen '>
            <Input
                suffix= {<img src={searchIcon} />}
                placeholder="Search..."
                className='search-bar w-[30rem] mt-[1.5rem]  '
                size='lg'
            />


            <Post />
        </div>
    );
}

export default Home;
