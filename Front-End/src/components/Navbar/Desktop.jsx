import React from 'react'
import { Link } from 'react-router-dom';


export default function Desktop() {
    return (
        <section className='navLogContainer'>
            <Link to='/register' className='navBtn navLink'>Sign Up</Link>
            <Link to='/login' className='navBtn navLog navLink'>Login</Link>
        </section>
    )
}
