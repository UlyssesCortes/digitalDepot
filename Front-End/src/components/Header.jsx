import { Link } from 'react-router-dom';
import '../css/nav.css'

export default function Header() {
    return (
        <nav className='navbar'>
            <section className='leftNav'>
                <section className='titleContainer'>
                    <Link to='/' className='navLink companyTitle'>DigitalDepot</Link>

                </section>
                <section className='navLinks'>
                    <Link to='/' className='navLink '>Home</Link>

                    <Link to='/products' className='navLink '>Products</Link>
                    <Link to='/newsfeed' className='navLink '>Newsfeed</Link>
                    <Link to='/promo' className='navLink'>Promo</Link>
                </section>
            </section>
            <section className='rightNav'>
                <section className='navIcons'>
                    <div className='navSearchIcon'></div>
                    <div className='navCartIcon'></div>
                </section>
                <section className='navLogContainer'>
                    <Link to='/register' className='navBtn navLink'>Sign Up</Link>
                    <Link to='/login' className='navBtn navLog navLink'>Login</Link>
                </section>
            </section>
        </nav>
    )
}
