
export default function ProductListLoading() {

    const productCard = () => {
        return (
            <section className="productCard">
                <div className='imageContainer'>
                    <div className='productImg imageLoading shinny'></div>
                </div>
                <div className='productContent pLoading2 shinny'></div>
            </section>
        )
    }

    return (
        <section className="loadingProductContainer">
            {productCard()}
            {productCard()}
            {productCard()}
            {productCard()}
            {productCard()}
            {productCard()}
            {productCard()}
            {productCard()}
        </section>
    )
}
