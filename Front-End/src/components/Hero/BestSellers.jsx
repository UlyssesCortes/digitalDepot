import { Link } from 'react-router-dom';

export default function BestSellers() {
    return (
        <article className='bestSellerContainer'>
            <div className='title'>
                <h1>OUR BESTSELLERS</h1>
            </div>
            <section className="bestSellerProducts">
                <section className="bestLeft">
                    <Link to='/products' >
                        <div className="bestProduct1"></div>
                    </Link>

                </section>

                <section className="bestRight">
                    <Link to='/products' className="bestProduct2" ></Link>
                    <Link to='/products' className="bestProduct3"></Link>
                </section>
            </section>

        </article>
    )
}
