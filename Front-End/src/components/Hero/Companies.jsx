import logo1 from "../../assets/images/logo1.png"
import logo3 from "../../assets/images/logo3.png"
import logo4 from "../../assets/images/logo4.png"
import logo5 from "../../assets/images/logo5.png"

export default function Companies() {
    return (
        <section className="conpaniesContainer">
            <img className='huobi' src={logo1} alt="Product Image" loading='lazy' />
            <img className='fastmpany' src={logo5} alt="Product Image" loading='lazy' />
            <img className='duofast' src={logo4} alt="Product Image" loading='lazy' />
            <img className='hornet' src={logo3} alt="Product Image" loading='lazy' />
            <img className='chase' src={logo4} alt="Product Image" loading='lazy' />
        </section>
    )
}
