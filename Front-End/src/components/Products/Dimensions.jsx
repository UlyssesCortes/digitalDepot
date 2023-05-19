
export default function Dimensions({ dimensions }) {
    return (
        <>
            <section className='moreDetailsList'>
                {Object.keys(dimensions).map(key => (
                    <p key={key}>
                        <strong>{key}: </strong>
                        {dimensions[key]}
                    </p>
                ))}
            </section>
        </>
    );
}
