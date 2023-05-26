import React from 'react'
import Header from '../../Navbar/Header'

export default function Favorites({ setIsLoggedIn, isLoggedIn }) {
    return (
        <section className='marginReducer'>
            <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            <h1>Favorites</h1>

        </section>
    )
}
