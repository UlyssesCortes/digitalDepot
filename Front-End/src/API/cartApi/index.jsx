const localToken = window.localStorage.getItem('token');
const API_URL = "https://digital-depot.onrender.com/api/";

export async function getOrderItems(currentOrderId) {
    try {
        if (currentOrderId) {
            const response = await fetch(`${API_URL}order-items/${currentOrderId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const items = await response.json();
            return items
        }

    } catch (error) {
        console.error(error);
    }
}