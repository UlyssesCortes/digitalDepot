import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import StarRating from './StartRating';
import Features from './Features';
import Dimensions from './Dimensions';
import Shipping from './Shipping';

export default function ProductDetails({ API_URL }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [displayFeatures, setDisplayFeatures] = useState(false)
    const [displayDimensions, setDisplayDimensions] = useState(false)
    const [displayShipping, setDisplayShipping] = useState(false)

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${API_URL}products/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                if (result) {
                    setProduct(result);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductDetails();
    }, [API_URL, id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const productInfo = product[0];
    return (
        <>
            <Header />
            <div className='productDetailBox'>
                <section className='imageGallery'>
                    <img className="productImg1" src={productInfo.images[0]} alt="product Image" />
                    <div className='bottomImages'>
                        <img className="productImg2" src={productInfo.images[1]} alt="product Image" />
                        <img className="productImg3" src={productInfo.images[2]} alt="product Image" />
                        <img className="productImg4" src={productInfo.images[3]} alt="product Image" />
                    </div>

                </section>
                <section className='productDetailsRight'>
                    <div className='reviews'>
                        <div className='start'>
                            <StarRating />
                        </div>
                        <p className='ItemId'>Item No. {productInfo.id}</p>
                    </div>
                    <div className='nameAndPrice'>
                        <h2>{productInfo.title}</h2>
                        <p>${productInfo.price * quantity}.00</p>
                    </div>
                    <div className='quantity'>
                        <p>Quantity</p>
                        <div className='quntityBtns'>
                            <div className='minusIcon' onClick={() => { quantity < 4 && setQuantity(quantity + 1) }}>+</div>
                            <p>0{quantity}</p>
                            <div className='plusIcon' onClick={() => { quantity > 1 && setQuantity(quantity - 1) }}>-</div>
                        </div>
                    </div>
                    {quantity === 4 && <p className='tooManyError'>Maximum capacity reached!</p>}
                    <div className='shipInfo'>
                        <p>Available to ship in 2 weeks</p>
                    </div>
                    <div className='productBtns'>
                        <button className='addCartBtn'>Add To Cart</button>
                        <button className='saveToWishlist'>Save To Wishlist</button>
                    </div>
                    <div className='moreDetails'>

                        <div className="features"
                            onClick={() => {
                                setDisplayFeatures(!displayFeatures);
                            }}
                        >
                            <p>Product Features</p>
                            <p className="plus">{!displayFeatures ? "+" : "-"}</p>
                        </div>
                        <section className={`moreDetailsListAnimation ${displayFeatures ? "active" : ""}`}>
                            {displayFeatures && <Features features={productInfo.features} />}
                        </section>
                        <div className="dimensions"
                            onClick={() => {
                                setDisplayDimensions(!displayDimensions);
                            }}
                        >
                            <p>Dimensions</p>
                            <p className="plus">{!displayDimensions ? "+" : "-"}</p>
                        </div>
                        <section className={`moreDetailsListAnimation ${displayDimensions ? "active" : ""}`}>
                            {displayDimensions && <Dimensions dimensions={productInfo.dimensions} />}
                        </section>

                        <div className='shiping'
                            onClick={() => { setDisplayShipping(!displayShipping) }}>
                            <p>Shipping and Return</p>
                            <p className="plus">{!displayShipping ? "+" : "-"}</p>
                        </div>
                        <section className={`moreDetailsListAnimation ${displayShipping ? "active" : ""}`}>
                            {displayShipping && <Shipping />}

                        </section>
                    </div>
                </section >
            </div >
            <section className='detailsBottom'>
                <h1>Details</h1>
                <div className='summary'><p>01 Summary</p><p className='plus'>+</p></div>
                <div className='dimensions2'><p>02 Dimensions</p><p className='plus'>+</p></div>
            </section>
        </>
    );
}
