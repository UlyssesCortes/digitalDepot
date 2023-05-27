import { Link } from 'react-router-dom';
import React, { useState } from 'react'

import '../../css/nav.css'
import Desktop from './Desktop';
import Profile from './Profile';
import MobileNav from './MobileNav';

export default function Header({ setIsLoggedIn }) {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');
    const [showProfile, setShowProfile] = useState(false)


    return (
        <nav className='navbar'>
            <Desktop />
            <MobileNav />

            <section className='rightNav'>
                <section className='navIcons'>
                    <div className='navSearchIcon'></div>
                    <Link to='/cart' className='navCartIcon'></Link>
                </section>
                {isLoggedIn ?
                    <section>
                        <section className='profileSection'>
                            <div className='userIcon' onClick={() => { setShowProfile(!showProfile) }}></div>
                        </section>
                        {showProfile && <Profile showProfile={showProfile} setIsLoggedIn={setIsLoggedIn} />}
                    </section>
                    :
                    <section className='navLogContainer'>
                        <Link to='/register' className='navBtn navLink'>Sign Up</Link>
                        <Link to='/login' className='navBtn navLog navLink'>Login</Link>
                    </section>
                }
            </section>
        </nav>
    )
}
