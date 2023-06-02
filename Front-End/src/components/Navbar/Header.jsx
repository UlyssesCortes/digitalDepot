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

export default function Header({ setIsLoggedIn, setFilterName, setHideNav, favorites, finializedOrders, token, API_URL, setFavorites, showProfile, setShowProfile }) {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');
    // const [showProfile, setShowProfile] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const handleSearch = (event) => {
        setFilterName(event.target.value)
    }

    const fetchFavorites = async () => {
        try {
            try {
                const favoriteProducts = await fetch(`${API_URL}favorite/myFavorites`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const products = await favoriteProducts.json();
                console.log("FAVORITES: ", products)
                setFavorites(products)
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className='navbar' >
            <Desktop setFilterName={setFilterName} setShowProfile={setShowProfile} />
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
                        setShowSearch(!showSearch); setShowProfile(false)
                    }} />

                    <Link to='/cart' className='navCartIcons' onClick={() => { setShowProfile(false) }}>
                        <Lottie className="cartIcon" animationData={cart} loop={false} />
                    </Link >

                </section>
                {isLoggedIn ?
                    <section>
                        <section className='profileSection'>
                            <Lottie className="userIcon" animationData={user} loop={false} onClick={() => { setShowProfile(!showProfile); fetchFavorites() }} />
                        </section>


                        {showProfile && <Profile setIsLoggedIn={setIsLoggedIn} favorites={favorites} setShowProfile={setShowProfile} finializedOrders={finializedOrders} token={token} API_URL={API_URL} />}
                    </section>
                    :
                    <section className='navLogContainer'>
                        <Link to='/register' id='signUpBtn' className='navBtn' onClick={() => { setHideNav(true) }}>Sign Up</Link>
                        <Link to='/login' className='navBtn navLog' onClick={() => { setHideNav(true) }}>Login</Link>
                    </section>
                }
            </section>
        </nav>
    )
}
