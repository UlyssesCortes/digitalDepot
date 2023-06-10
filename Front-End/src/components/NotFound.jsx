import React, { useEffect } from 'react'
import Lottie from "lottie-react"
import { Link } from 'react-router-dom';
import error from "../assets/LottieAnimations/404.json"


export default function NotFound({ setHideNav }) {

    useEffect(() => {
        setHideNav(true)
    }, [])

    return (
        <Link to='/' className='notARouteError' onClick={() => { setHideNav(false) }}>
            <Lottie className="routeError" animationData={error} loop={true} />
        </Link>
    )
}
