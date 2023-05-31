import React from 'react'
import '../../css/loading.css'

export default function ProductLoading() {
    return (
        <section className='marginReducer'>
            <div className='productDetailBox'>
                <section className='imageGallery '>
                    <div className="productImg1 loadingGrey shinny" />
                    <div className='bottomImages '>
                        <div className="productImg2 loadingGrey shinny" />
                        <div className="productImg3 loadingGrey shinny" />
                        <div className="productImg4 loadingGrey shinny" />
                    </div>
                </section>
                <section className='productDetailsRight'>
                    <div className='reviews loadingGrey shinny'>
                        <p className=' pLoading shinny'></p>
                    </div>
                    <div className='nameAndPrice '>
                        <p className='nameLoading shinny'></p>
                    </div>
                    <div>
                        <p className='priceLoading shinny'></p>
                    </div>
                    <div className='quantity quantityLoading shinny'>
                    </div>
                    <p className='pLoading shinny'></p>

                    <div className='shipInfo'>
                    </div>
                    <div className='productBtns'>
                        <button className='addCartBtn loadingGrey shinny' ></button>
                        <button className='saveToWishlist loadingGrey shinny'></button>
                    </div>
                    <div className='moreDetails divLoadingCont'>
                        <div className="features divLoading shinny"></div>
                        <div className="dimensions divLoading shinny"></div>
                        <div className="description divLoading shinny"></div>
                        <div className='shiping divLoading shinny'></div>
                    </div>
                </section >
            </div >
        </section >
    )
}
