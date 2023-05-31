import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import Lottie from "lottie-react"
import search from "../../assets/searchClock.json"
import cart from "../../assets/cart.json"
import user from "../../assets/userAnimation.json"

import '../../css/nav.css'
import Desktop from './Desktop';
import Profile from './Profile';
import MobileNav from './MobileNav';

export default function Header({ setIsLoggedIn, setFilterName }) {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');
    const [showProfile, setShowProfile] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

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
                            className={`searchInput ${showSearch ? 'active' : ''}`}
                            name="txt"
                            onChange={handleSearch}
                            placeholder="Search..."
                        />

                    </div>
                    <Lottie className="headerIcon" animationData={search} loop={false} onClick={() => {
                        setShowSearch(!showSearch);
                    }} />

                    <Link to='/cart' className='navCartIcons'>
                        <Lottie className="cartIcon" animationData={cart} loop={false} />
                    </Link>

                </section>
                {isLoggedIn ?
                    <section>
                        <section className='profileSection'>
                            <Lottie className="userIcon" animationData={user} loop={false} onClick={() => { setShowProfile(!showProfile) }} />
                        </section>
                        {showProfile && <Profile showProfile={showProfile} setIsLoggedIn={setIsLoggedIn} />}
                    </section>
                    :
                    <section className='navLogContainer'>
                        <Link to='/register' id='signUpBtn' className='navBtn '>Sign Up</Link>
                        <Link to='/login' className='navBtn navLog'>Login</Link>
                    </section>
                }
            </section>
        </nav>
    )
}
