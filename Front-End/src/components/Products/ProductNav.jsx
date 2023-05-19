
export default function ProductNav({ setFilterName }) {
    return (
        <nav className="productNav">
            <section className="topNavProduct">
                <p>MODERN FURNITURE</p>
            </section>
            <section className="bottomNavProduct">
                <button className="productLinks"
                    onClick={() => { setFilterName("all") }}>New Arrivals</button>
                <button className="productLinks"
                    onClick={() => { setFilterName("bed") }}>Beds</button>
                <button className="productLinks"
                    onClick={() => { setFilterName("sofa") }}>Sofas</button>
                <button className="productLinks"
                    onClick={() => { setFilterName("chair") }}>Chairs</button>
                <button className="productLinks"
                    onClick={() => { setFilterName("table") }}>Tables</button>
                <button className="productLinks"
                    onClick={() => { setFilterName("desk") }}>Desks</button>
            </section>
        </nav>
    )
}
