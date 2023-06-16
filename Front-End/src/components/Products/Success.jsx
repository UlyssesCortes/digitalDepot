import React, { useEffect } from 'react'
import Lottie from "lottie-react"
import checkout from "../../assets/LottieAnimations/checkout.json"

export default function Success({ API_URL, token, currentOrderId, setCurrentOrderId }) {

    const handleUpdate = async (orderId) => {
        console.log("RUNNINT HANDLE UPDATE")

        var currentDate = new Date();
        var checkoutDate = new Date(currentDate);
        checkoutDate.setDate(currentDate.getDate());

        var month = checkoutDate.getMonth() + 1;
        var day = checkoutDate.getDate();
        var year = checkoutDate.getFullYear();

        var formattedDate = month + '/' + day + '/' + year;

        try {
            const response = await fetch(`${API_URL}order/${orderId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    isCheckedOut: true,
                    checkoutDate: formattedDate,
                    // checkoutSum: sum
                })
            });
            const result = await response.json();

            if (result.name !== "error") {
                localStorage.setItem('currentOrderId', "");
                setCurrentOrderId("")
                // setCheckoutAnimation(true)
            } else {
                console.log("Failed to send order, try again!")
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
            console.log("RUNNINT HANDLE UPDATE IF")
            handleUpdate(currentOrderId)
        }
    }, [])

    return (
        <setion className="successPage">
            <Lottie className="checkoutAnimation" animationData={checkout} loop={false} />
        </setion>
    )
}
