import '../../css/hero.css'

import Banner from "./Banner"
import Companies from './Companies'
import Furniture from './Furniture'
import Sale from './Sale'
import Footer from './Footer'
import BestSellers from './BestSellers'
import Benefits from './Benefits'


export default function Hero({ setFilterName, setShowProfile, setIsCategorieOpen }) {
    return (
        <section className='marginReducer' onClick={() => { setShowProfile(false) }}>
            <Banner />
            <Companies />
            <Furniture setFilterName={setFilterName} />
            <Sale />
            <Benefits />
            <BestSellers />
            <Footer setIsCategorieOpen={setIsCategorieOpen} />
        </section>
    )
}
