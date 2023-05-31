import React from 'react'
import { Link } from 'react-router-dom';
import '../../css/offer.css'

export default function Offers() {
    return (
        <section className='marginReducer'>
            <section className='offers'>
                <section className='topOffers'>
                    <Link to='/products' className='topOffer'></Link>
                </section>
                <section className='bottomOffer'>
                    <Link to='/products' className='firstBottom'></Link>
                    <Link to='/products' className='secondBottom'></Link>
                </section>

            </section>
        </section>
    )
}
