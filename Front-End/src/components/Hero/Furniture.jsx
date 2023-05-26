import { Link } from 'react-router-dom';

export default function Furniture({ setFilterName }) {

    return (
        <article className="furnitureComponent">
            <section className="topFurniture">
                <h1>Exclusive Furniture</h1>
                <p>Check out this week&rsquo;s selection of popular products that might catch your eye, and don&rsquo;t</p>
            </section>

            <section className="furnitureCategory">
                <Link to='./products' className="livingRoomCard furnitureCard" onClick={() => { setFilterName("Living Room") }}>
                    <div className="livingRoomImg furnitureCardImg"></div>
                    <p>Living room</p>
                </Link>
                <Link to='/products' className="bedRoomCard furnitureCard" onClick={() => { setFilterName("Bedroom") }}>
                    <div className="bedroomImg furnitureCardImg"></div>
                    <p>Bedroom</p>
                </Link>
                <Link to='/products' className="workSpaceCard furnitureCard" onClick={() => { setFilterName("Workspace") }}>
                    <div className="workspaceImg furnitureCardImg"></div>
                    <p>Workspace</p>
                </Link>
                <Link to='products' className="kitchenCard furnitureCard" onClick={() => { setFilterName("Kitchen") }}>
                    <div href="#topNav" className="kitchenImg furnitureCardImg"></div>
                    <p>Kitchen</p>
                </Link>
            </section>

        </article>
    )
}
