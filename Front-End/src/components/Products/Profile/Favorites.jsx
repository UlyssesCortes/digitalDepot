import { Link } from 'react-router-dom';

export default function Favorites({ favorites, setShowProfile }) {



    return (
        <section className='favoriteContainer' onClick={() => { setShowProfile(false) }}>
            {favorites && favorites.map((favorite) => {
                return (
                    <Link
                        to={`/product/${favorite.id}`}
                        className="favoriteProd" key={favorite.id} >

                        <img className='favProductImg' src={favorite.images[0]} alt="" />
                        <div className='topContentBoxFav'>
                            <p className="favTitle">{favorite.title}</p>
                            <p className="favPrice">${favorite.price}</p>
                        </div>
                    </Link>
                );
            })}
        </section>
    )
}
