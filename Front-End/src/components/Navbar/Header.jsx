import { Link } from 'react-router-dom';
import React, { useState } from 'react'

import '../../css/nav.css'
import Desktop from './Desktop';
import Profile from './Profile';
import MobileNav from './MobileNav';

export default function Header({ setIsLoggedIn, setFilterName }) {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');
    const [showProfile, setShowProfile] = useState(false)

    const handleSearch = (event) => {
        setFilterName(event.target.value)
    }

    return (
        <nav className='navbar'>
            <Desktop setFilterName={setFilterName} />
            <MobileNav />

            <section className='rightNav'>
                <section className='navIcons'>

                    <div className="box">
                        <input
                            type="text"
                            className="searchInput"
                            name="txt"
                            onChange={handleSearch}
                            placeholder="Search..."
                        />
                        <img className="headerIcon" src="https://cdn-icons-png.flaticon.com/512/54/54481.png" alt="searchIcon" />
                    </div>

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
