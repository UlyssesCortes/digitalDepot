import React, { useEffect } from 'react'
import Lottie from "lottie-react"
import checkout from "../../../assets/LottieAnimations/checkout.json"
import { useNavigate } from 'react-router-dom';


export default function Success({ API_URL, setCurrentOrderId, setCartItems }) {
    let orderId
    const navigate = useNavigate();

    const handleUpdate = async () => {

        var currentDate = new Date();
        var checkoutDate = new Date(currentDate);
        checkoutDate.setDate(currentDate.getDate());

        var month = checkoutDate.getMonth() + 1;
        var day = checkoutDate.getDate();
        var year = checkoutDate.getFullYear();

        var formattedDate = month + '/' + day + '/' + year;

        try {

            const currentOrderId = window.localStorage.getItem('currentOrderId');
            const localToken = window.localStorage.getItem('token');
            const totalSum = window.localStorage.getItem('totalSum');

            if (!currentOrderId || currentOrderId == undefined) {
                const response = await fetch(`${API_URL}order/myOrders`, {
                    headers: {
                        Authorization: `Bearer ${localToken}`
                    }
                });
                const data = await response.json();
                orderId = data[0].id
            } else {
                orderId = currentOrderId
            }

            if (orderId) {
                const response = await fetch(`${API_URL}order/${orderId}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localToken}`,
                    },
                    body: JSON.stringify({
                        isCheckedOut: true,
                        checkoutDate: formattedDate,
                        checkoutSum: totalSum,
                    })
                });
                const result = await response.json();
                console.log("result: ", result)
                if (result.name !== "error") {
                    localStorage.setItem('currentOrderId', "");
                    setCurrentOrderId("")
                    setCartItems([])
                    setTimeout(() => {
                        navigate('/');
                    }, 3300);
                } else {
                    console.log("Failed to send order, try again!")
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('payment');
        const isPaymentSuccessful = paymentStatus === 'success';

        if (isPaymentSuccessful) {
            handleUpdate()
        }
    }, [])

    return (
        <setion className="successPage">
            <Lottie className="checkoutAnimation" animationData={checkout} loop={false} />
        </setion>
    )
}
