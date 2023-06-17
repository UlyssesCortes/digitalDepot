import '../../css/footer.css'
import { Link } from 'react-router-dom';

export default function Footer({ setIsCategorieOpen }) {
    const handleCategory = () => {
        setIsCategorieOpen(true)
    }
    return (
        <section className='footer'>
            <section className='leftFotNav'>
                <p>Contacts</p>
                <p className='phoneNumebr'>(406) 555-0120</p>
                <p className='phoneNumebr'> contact@digitaldepot.com</p>
            </section>
            <section className='rightFotNav'>
                <a href="#topHeader" className='navLink '>Home</a>
                <Link to='/products' className='navLink '>Shop</Link>
                <a href='#topHeader' className="navLink categorieFooter" onClick={() => { handleCategory() }}>Categories</a>
                <Link to='/offers' className='navLink'>Special Offers</Link>
            </section>
        </section >
    )
}
