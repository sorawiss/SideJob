import React, { useContext, useState } from 'react';
import { Input } from "rizzui";
import { Outlet, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import searchIcon from '../assets/svg/search-icon.svg';
import './Style/Home.css'

import Nav from '../components/Nav';
import NewPost from '../components/NewPost';
import Loading from '../components/Loading';
import { AuthContext } from '../context/AuthContext';



function Home() {
    const [onPost, setOnPost] = useState(false)
    const [search, setSearch] = useState('')
    const location = useLocation()
    const { currentUser } = useContext(AuthContext)

    const setCreatePost = () => {
        setOnPost(!onPost)
    }


    // Set Page
    const isFindPage = location.pathname === '/home/find';
    const isHirePage = location.pathname === '/home/hire';


    // Get Posts
    const { isPending, error, data } = useQuery({
        queryKey: ['posts', isFindPage],
        queryFn: () =>
            fetch(`http://localhost:3333/getPosts?category=${isFindPage}`, {
                credentials: 'include',
            }).then((res) =>
                res.json()
            ),
        enabled: isFindPage || isHirePage
    })

    if (isPending) return <Loading />
    if (error) return 'An error has occurred: ' + error.message


    // Filter data
    let filterData = {}
    if (search == '') {
        filterData = data
    }
    else {
        filterData = data.filter((items) => {
            return items.title.toLowerCase().includes(search.toLowerCase()) ||
                items.details.toLowerCase().includes(search.toLowerCase()) ||
                items.members.fname.toLowerCase().includes(search.toLowerCase()) ||
                items.members.lname.toLowerCase().includes(search.toLowerCase())
        })
    }



    return (
        <div className='search-bar home-container bg-primarylight flex flex-col items-center gap-[1rem] max-w-screen min-h-screen pb-[8rem] '>
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                suffix={<img src={searchIcon} />}
                placeholder="Search..."
                className=' w-[30rem] mt-[1.5rem] '
                size='lg'
            />

            <Outlet context={filterData} />

            <Nav setCreatePost={setCreatePost} />

            {onPost ? <NewPost setCreatePost={setCreatePost} profilePic={currentUser.profile_picture} isJob={isFindPage} /> : null}
        </div>
    );
}

export default Home;
