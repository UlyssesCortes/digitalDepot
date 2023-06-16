import React from 'react'
import Lottie from "lottie-react"
import checkout from "../../assets/LottieAnimations/checkout.json"

export default function Success() {
    return (
        <setion className="successPage">
            <Lottie className="checkoutAnimation" animationData={checkout} loop={false} segments={segments} />
        </setion>
    )
}
