
export default function BestSellers() {
    return (
        <article className='bestSellerContainer'>
            <div className='title'>
                <h1>OUR BESTSELLERS</h1>
            </div>
            <section className="bestSellerProducts">
                {/* On hover make overlay appear with name and price and button to see full details */}
                <section className="bestLeft">
                    <div className="bestProduct1"></div>
                </section>

                <section className="bestRight">
                    <div className="bestProduct2"></div>
                    <div className="bestProduct3"></div>
                </section>
            </section>

        </article>
    )
}
