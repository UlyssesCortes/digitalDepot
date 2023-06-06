import '../css/footer.css'

export default function Footer() {
    return (
        <section className='footer'>

            <div className='footerColumn'>
                <p className='linkTtitle'>Contact Us</p>
                <div className='linksFooter'>
                    <a className='links'>Join Us</a>
                    <a href="tel:+7606854653" className='links'>760-685-4653</a>
                    <a href="mailto:john@windowprosofsandiego.com" className='links'>john@windowprosofsandiego.com</a>
                </div>
            </div>

            <div className='footerColumn'>
                <p className='linkTtitle'>Categories</p>
                <div className='linksFooter'>
                    <a className='links' href="#services"
                    >Residential</a>
                    <a className='links' href="#services"
                    >Commercial</a>
                    <a className='links' href="#services"
                    >Solar Panel</a>
                </div>
            </div>

            <div className='footerColumn'>
                <p className='linkTtitle'>Testimonials</p>
                <div className='linksFooter'>
                    <a className='links'>Yelp</a>

                    <a href='#gallery' className='links'>Clients</a>
                    <a href='#reviews' className='links'>Reviews</a>
                </div>
            </div>


        </section>
    )
}
