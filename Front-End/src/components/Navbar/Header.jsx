import { Link } from 'react-router-dom';
import '../../css/nav.css'
import Desktop from './Desktop';
import UserIcon from './UserIcon';

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
                        <p className='navLink categoryLink'>Categories</p>
                        <div className='navCategories'>
                            <Link to='/products' className='navCategory'>Living Room</Link>
                            <Link to='/products' className='navCategory'>Bedroom</Link>
                            <Link to='/products' className='navCategory'>Workspace</Link>
                            <Link to='/products' className='navCategory'>Kitchen</Link>


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
