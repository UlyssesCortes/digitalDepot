import '../../css/hero.css'

import Banner from "./Banner"
import Companies from './Companies'
import Furniture from './Furniture'
import Sale from './Sale'
import Footer from '../Footer'
import BestSellers from './BestSellers'
import Benefits from './Benefits'


export default function Hero() {
    return (
        <>
            <Banner />
            <Companies />
            <Furniture />
            <Sale />
            <BestSellers />
            <Benefits />
            <Footer />
        </>
    )
}
