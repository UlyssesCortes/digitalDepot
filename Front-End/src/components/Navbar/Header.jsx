import { Link } from 'react-router-dom';
import '../../css/nav.css'
import Desktop from './Desktop';
import UserIcon from './UserIcon';

export default function Header({ isLoggedIn }) {
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
                    <Link to='/cart' className='navCartIcon'></Link>
                </section>
                {isLoggedIn ?
                    <UserIcon /> :
                    <Desktop />
                }
            </section>
        </nav>
    )
}
