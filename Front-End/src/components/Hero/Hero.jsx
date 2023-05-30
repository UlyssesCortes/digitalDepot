import '../../css/hero.css'

import Banner from "./Banner"
import Companies from './Companies'
import Furniture from './Furniture'
import Sale from './Sale'
import Header from '../Navbar/Header'
// import Footer from '../Footer'
import BestSellers from './BestSellers'
import Benefits from './Benefits'


export default function Hero({ isLoggedIn, setIsLoggedIn, setFilterName }) {
    return (
        <section className='marginReducer'>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setFilterName={setFilterName} />
            <Banner />
            <Companies />
            <Furniture setFilterName={setFilterName} />
            <Sale />
            <Benefits />
            <BestSellers />
            {/* <Footer /> */}
        </section>
    )
}
