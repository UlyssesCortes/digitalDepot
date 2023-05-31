import React, { useEffect, useState } from 'react'
import Header from '../../Navbar/Header'

export default function Favorites({ setIsLoggedIn, isLoggedIn, token, API_URL }) {
    const [favorites, setFavorites] = useState([])

    const fetchFavorites = async () => {
        try {
            const favoriteResponse = await fetch(`${API_URL}favorite`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const favorite = await favoriteResponse.json();

            if (favorite && favorite.length > 0) {
                try {
                    let productIndex = favorite.length - 1;
                    const favoriteProductsArray = [];
                    while (productIndex >= 0) {
                        const favoriteProducts = await fetch(`${API_URL}products/${favorite[productIndex].productId}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        const products = await favoriteProducts.json();
                        favoriteProductsArray.push(...products);
                        productIndex--;
                    }
                    setFavorites(favoriteProductsArray)
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <section className='marginReducer'>
            <h1>Favorites</h1>

            <section className='favoriteProduct'>
                {favorites && favorites.map((favorite) => {
                    return (
                        <div className="cartProduct " key={favorite.id}>
                            <img className='cartProductImg' src={favorite.images[0]} alt="" />
                            <div className='contentBox'>
                                <div className='topContentBox'>
                                    <h3>{favorite.title}</h3>
                                    <h3>${favorite.price}</h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>


        </section>
    )
}
