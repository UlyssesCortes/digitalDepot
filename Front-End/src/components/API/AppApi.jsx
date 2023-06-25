import axios from 'axios';

export const getCartTestAPI = async (API_URL) => {
    try {
        const localToken = window.localStorage.getItem('token');
        if (localToken) {
            const response = await axios.get(`${API_URL}order/cart`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localToken}`,
                },
            });
            const items = await response.data;
            if (items) {
                return items
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const getProductsAPI = async (API_URL) => {
    const isLoggedInLocal = window.localStorage.getItem('isLoggedIn');
    const localToken = window.localStorage.getItem('token');
    try {
        if (isLoggedInLocal) {
            const response = await axios.get(`${API_URL}products/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localToken}`,
                },
            });
            const result = await response.data;
            if (result) {
                return result
            }
            return result;
        }
    } catch (error) {
        console.error(error);
    }
};

export const fetchGuestProductsAPI = async (API_URL) => {
    const localToken = window.localStorage.getItem('token');
    try {
        if (!localToken) {
            const response = await axios.get(`${API_URL}products`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.data;
            if (result) {
                return result
            }
            return result;
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUserAPI = async (API_URL) => {
    const localToken = window.localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localToken}`,
            },
        })
        const result = await response.data
        if (result) {
            return result
        }
    } catch (error) {
        console.log(error)
    }
}

export const fetchMyOrdersAPI = async (token, API_URL) => {
    try {
        if (token) {
            const response = await axios.get(`${API_URL}order/myOrders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.data;
            const orderId = data[0].id
            localStorage.setItem('currentOrderId', orderId);
            if (orderId) {
                return orderId
            }
        }
    } catch (error) {
        console.log(error)
    }

}