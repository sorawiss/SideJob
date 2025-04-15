import React, {  useState } from 'react';
import { Input } from "rizzui";
import { Outlet } from 'react-router-dom';

import searchIcon from '../assets/svg/search-icon.svg';
import './Style/Home.css'

import Nav from '../components/Nav';



function Home() {
    const [onPost, setOnPost] = useState(false)
    const [search, setSearch] = useState('')

    const setCreatePost = () => {
        setOnPost(!onPost)
    }




    return (
        <div className='home-container bg-primarylight flex flex-col items-center gap-[1rem] max-w-screen min-h-screen pb-[8rem] '>
            <div className="search-bar">
                <Input
                    inputClassName='!border-none !ring-0 rounded-[16px]  '
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    suffix={<img src={searchIcon} />}
                    placeholder="Search..."
                    className=' w-[30rem] mt-[1.5rem] '
                    size='lg'
                />
            </div>

            <Outlet context={search} />

            <Nav setCreatePost={setCreatePost} />
        </div>
    );
}

export default Home;
