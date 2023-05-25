import React, { useState } from 'react'
import Profile from './Profile'

export default function UserIcon({ setIsLoggedIn }) {
    const [showProfile, setShowProfile] = useState(false)

    return (
        <>

            <section className='profileSection'>
                <div className='userIcon' onClick={() => { setShowProfile(!showProfile) }}></div>
            </section>

            {showProfile && <Profile showProfile={showProfile} setIsLoggedIn={setIsLoggedIn} />}
        </>
    )
}