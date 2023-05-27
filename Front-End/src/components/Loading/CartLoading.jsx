// import loading from "/root/DigitalDepot/Front-End/src/assets/loading.json"
import Lottie from "lottie-react"
import loading from "../../assets/loadingLines.json"

export default function CartLoading() {

    return (

        <div className="loadingWrapper">
            <Lottie className="loadingAnimation" animationData={loading} />
        </div>
    )
}
