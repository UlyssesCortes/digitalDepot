import '../css/footer.css'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <section className='footer'>
            <section className='leftFotNav'>
                <p>Contacts</p>
                <p className='phoneNumebr'>(406) 555-0120</p>
                <p className='phoneNumebr'> contact@digitaldepot.com</p>
            </section>
            <section className='rightFotNav'>
                <Link to='/' className='navLink '>Home</Link>
                <Link to='/products' className='navLink '>Shop</Link>
                <p className="navLink categorieFooter">Categories</p>
                <Link to='/offers' className='navLink'>Special Offers</Link>
            </section>
        </section >
    )
}
