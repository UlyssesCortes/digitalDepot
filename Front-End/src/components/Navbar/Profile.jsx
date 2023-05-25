import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export default function Profile({ setIsLoggedIn }) {


    const handleLogOutBtn = () => {
        localStorage.removeItem('isLoggedIn')
        window.localStorage.removeItem('token');
        console.log("REMOVING ")
        setIsLoggedIn(false)
    }

    return (
        <section className='profileSectionBtn' >
            <div className='triShape'></div>
            <button className='profileBtns profileBtn1'>
                <div className='btnContainer'>
                    <Link to='/cart' className='userLink'>Cart</Link>
                    <div className='profileIcon1'></div>
                </div>
            </button>
            <button className='profileBtns profileBtn2'>
                <div className='btnContainer'>
                    <p>Orders</p>
                    <div className='profileIcon2'></div>
                </div>
            </button>
            <button className='profileBtns profileBtn3'>
                <div className='btnContainer'>
                    <p>Favorites</p>
                    <div className='profileIcon3'></div>
                </div>
            </button>
            <button className='profileBtns profileBtn4'>
                <div className='btnContainer' onClick={() => { handleLogOutBtn() }}>
                    <p>Logout</p>
                    <div className='profileIcon4'></div>
                </div>
            </button>

        </section>
    )
}
