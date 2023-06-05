import { Link } from 'react-router-dom';

export default function Favorites({ favorites }) {

    return (
        <section className='favBox'>
            <section className='favoriteContainer'>
                {favorites && favorites.map((favorite) => {
                    return (
                        <Link
                            to={`/product/${favorite.id}`}
                            className="favoriteProd" key={favorite.id} >
                            <img className='favProductImg' src={favorite.image} alt="" />
                            <div className='topContentBoxFav'>
                                <p className="favTitle">{favorite.title}</p>
                                <p className="favPrice">${favorite.price}</p>
                            </div>
                        </Link>
                    );
                })}
            </section >
            <section className='recomendations'></section>
        </section>

    )
}
