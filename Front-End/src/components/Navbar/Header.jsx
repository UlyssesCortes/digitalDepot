import { Link } from 'react-router-dom';
import '../../css/nav.css'
import Desktop from './Desktop';
import UserIcon from './UserIcon';
import Profile from './Profile';

export default function Header({ setIsLoggedIn }) {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');

    return (
        <nav className='navbar'>
            <section className='leftNav'>
                <section className='titleContainer'>
                    <Link to='/' className='navLink companyTitle'>DigitalDepot</Link>

                </section>
                <section className='navLinks'>
                    <Link to='/' className='navLink '>Home</Link>

                    <Link to='/products' className='navLink '>Products</Link>
                    <section className='navCategorieSec'>
                        <Link className='navLink categoryLink'>Categories</Link>
                        <div className='navCategories'>
                            <p className='navCategory'>Living Room</p>
                            <p className='navCategory'>Bedroom</p>
                            <p className='navCategory'>Workspace</p>
                            <p className='navCategory'>Kitchen</p>
                        </div>
                    </section>
                    <Link to='/promo' className='navLink'>Promo</Link>
                </section>
            </section>
            <section className='rightNav'>
                <section className='navIcons'>
                    <div className='navSearchIcon'></div>
                    <Link to='/cart' className='navCartIcon'></Link>
                </section>
                {isLoggedIn ?
                    <UserIcon setIsLoggedIn={setIsLoggedIn} /> :
                    <Desktop />
                }
            </section>
        </nav>
    )
}
