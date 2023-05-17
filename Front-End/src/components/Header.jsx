import '../css/nav.css'
export default function Header() {
    return (
        <nav className='navbar'>
            <section className='leftNav'>
                <section className='titleContainer'>
                    <p>DigitalDepot</p>
                </section>
                <section className='navLinks'>
                    <a className='navLink'>Home</a>
                    <a className='navLink'>Products</a>
                    <a className='navLink'>Newsfeed</a>
                    <a className='navLink'>Promo</a>
                </section>
            </section>
            <section className='rightNav'>
                <section className='navIcons'>
                    <div className='navSearchIcon'></div>
                    <div className='navCartIcon'></div>
                </section>
                <section className='navLogContainer'>
                    <button className='navBtn'>Sign Up</button>
                    <button className='navBtn navLog'>Login</button>
                </section>
            </section>
        </nav>
    )
}
