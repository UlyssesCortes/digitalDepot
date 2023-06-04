
export default function ProductNav({ setFilterName, setCurrentPage }) {

    const handleNavBtn = (categorie) => {
        setFilterName(categorie)
        setCurrentPage(1)
    }

    return (
        <nav className="productNav" id='topNav'>
            <section className="topNavProduct">
                <p>MODERN FURNITURE</p>
            </section>
            <section className="bottomNavProduct" id='topSubNav'>
                <button className="productLinks"
                    onClick={() => handleNavBtn("all")}>All Furniture</button>
                <button className="productLinks"
                    onClick={() => handleNavBtn("bed")}>Beds</button>
                <button className="productLinks sofa"
                    onClick={() => handleNavBtn("sofa")}>Sofas</button>
                <button className="productLinks"
                    onClick={() => handleNavBtn("chair")}>Chairs</button>
                <button className="productLinks tables"
                    onClick={() => handleNavBtn("table")}>Tables</button>
                <button className="productLinks"
                    onClick={() => handleNavBtn("desk")}>Desks</button>
            </section>
        </nav>
    )
}
