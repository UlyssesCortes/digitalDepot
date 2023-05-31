import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Favorites from '../Products/Profile/Favorites';

export default function Profile({ setIsLoggedIn, favorites, setShowProfile }) {

    const [showFavorite, setShowFavorite] = useState(false)
    const [showOrder, setShowOrder] = useState(false)

    const handleLogOutBtn = () => {
        localStorage.removeItem('isLoggedIn')
        window.localStorage.removeItem('token');
        setIsLoggedIn(false)
    }

    return (
        <section className='profileSectionBtn' >
            {/* <div className='triShape'></div> */}
            <Link to='/cart' className='profileBtns profileBtn1'>
                <div className='btnContainer'>
                    <div className='userLink'>Cart</div>
                    <div className='profileIcon1'></div>
                </div>
            </Link>

            <div className='profileBtns profileBtn2' onClick={() => { setShowOrder(!showOrder) }}>
                <div className='btnContainer'>
                    <p>Orders</p>
                    <div className='profileIcon2'></div>
                </div>
            </div>

            <div className='profileBtns profileBtn3' onClick={() => { setShowFavorite(!showFavorite) }}>
                <div className='btnContainer' >
                    <p>Favorites</p>
                    <div className='profileIcon3'></div>
                    {showFavorite && <Favorites favorites={favorites} setShowProfile={setShowProfile} />}
                </div>
            </div>
            <button className='profileBtns profileBtn4'>
                <div className='btnContainer' onClick={() => { handleLogOutBtn() }}>
                    <p>Logout</p>
                    <div className='profileIcon4'></div>
                </div>
            </button>

        </section>
    )
}
