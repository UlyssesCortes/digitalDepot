
export default function Furniture() {
    return (
        <article className="furnitureComponent">
            <section className="topFurniture">
                <h1>Exclusive Furniture</h1>
                <p>Check out this week&rsquo;s selection of popular products that might catch your eye, and don&rsquo;t</p>
            </section>

            <section className="furnitureCategory">
                <div className="livingRoomCard furnitureCard">
                    <div className="livingRoomImg furnitureCardImg"></div>
                    <p>Living room</p>
                </div>
                <div className="bedRoomCard furnitureCard">
                    <div className="bedroomImg furnitureCardImg"></div>
                    <p>Bedroom</p>
                </div>
                <div className="workSpaceCard furnitureCard">
                    <div className="workspaceImg furnitureCardImg"></div>
                    <p>Workspace</p>
                </div>
                <div className="kitchenCard furnitureCard">
                    <div className="kitchenImg furnitureCardImg"></div>
                    <p>Kitchen</p>
                </div>
            </section>

        </article>
    )
}
