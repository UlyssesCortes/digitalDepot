import React from 'react'
// import Header from '../Header'
import Header from '../../Navbar/Header'

export default function Orders({ setIsLoggedIn, isLoggedIn }) {
    return (
        <section className='marginReducer'>
            <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            <h1>Orders</h1>
        </section>
    )
}
