import React from 'react'

export default function Profile() {
    return (
        <section className='profileSectionBtn' >
            <div className='triShape'></div>
            <button className='profileBtns profileBtn1'>
                <div>
                    <p>Cart</p>
                    <div className='profileIcon'></div>
                </div>
            </button>
            <button className='profileBtns profileBtn2'>
                <div>
                    <p>Orders</p>
                    <div className='profileIcon'></div>
                </div>
            </button>
            <button className='profileBtns profileBtn3'>
                <div>
                    <p>Favorites</p>
                    <div className='profileIcon'></div>
                </div>
            </button>
            <button className='profileBtns profileBtn4'>
                <div>
                    <p>Logout</p>
                    <div className='profileIcon'></div>
                </div>
            </button>

        </section>
    )
}
