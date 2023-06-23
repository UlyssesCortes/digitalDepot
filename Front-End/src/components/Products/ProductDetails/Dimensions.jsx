
export default function Dimensions({ dimensions }) {
    return (
        <>
            <section className='moreDetailsList'>
                {Object.keys(dimensions).map(key => (
                    <p key={key} className="otherFont">
                        <strong>{key}: </strong>
                        {dimensions[key]}
                    </p>
                ))}
            </section>
        </>
    );
}
