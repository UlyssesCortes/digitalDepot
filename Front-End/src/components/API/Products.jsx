import axios from 'axios';
const isLoggedInLocal = window.localStorage.getItem('isLoggedIn');

export const addFavoriteAPI = async (productId, API_URL) => {
    const localToken = window.localStorage.getItem('token');

    if (isLoggedInLocal) {
        try {
            const favoriteResponse = await axios.post(`${API_URL}favorite/${productId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localToken}`,
                },
            });
            if (favoriteResponse.status === 200) {
                return true
            } else {
                throw new Error(
                    `Failed to create order. Status: ${favoriteResponse.status}`
                );
            }
        } catch (error) {
            console.error(error);
        }
    }
};

export const removeFavoriteAPI = async (productId, API_URL) => {
    const localToken = window.localStorage.getItem('token');

    try {
        const favoriteResponse = await axios.delete(`${API_URL}favorite/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localToken}`,
            },
        });

        if (favoriteResponse.status === 200) {
            return true

        } else {
            throw new Error(
                `Failed to create order. Status: ${favoriteResponse.status}`
            );
        }
    } catch (error) {
        console.error(error);
    }
};

export const fetchMyFavoritesAPI = async (API_URL) => {
    const localToken = window.localStorage.getItem('token');

    try {
        const favoriteProducts = await axios.get(`${API_URL}favorite/myFavorites`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localToken}`,
            },
        });
        const products = await favoriteProducts.data;
        return products
    } catch (error) {
        console.log(error);
    }
};

export const fetchOrderHistoryAPI = async (API_URL) => {
    const localToken = window.localStorage.getItem('token');

    try {
        if (localToken) {
            const response = await axios.get(`${API_URL}order/history`, {
                headers: {
                    Authorization: `Bearer ${localToken}`
                }
            });
            const data = await response.data;
            return data
        }
    } catch (error) {
        console.log(error)
    }
}


export const fetchProductDetailsAPI = async (API_URL, id) => {
    const localToken = window.localStorage.getItem('token');

    try {
        const response = await axios.get(`${API_URL}products/details/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localToken}`,
            },
        });
        const result = await response.data;
        if (result) {
            return result
        }
    } catch (error) {
        console.log(error)
    }
}

export const fetchGuestProductDetails = async (API_URL, id) => {
    try {
        const response = await axios.get(`${API_URL}products/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        const result = await response.data;
        if (result) {
            return result
        }
    } catch (error) {
        console.log(error)
    }
}