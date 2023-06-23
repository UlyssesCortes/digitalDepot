export default function Features({ features }) {
    return (
        <>
            <section className="moreDetailsList">
                {Object.keys(features).map((key) => (
                    <p key={key} className="otherFont">
                        <strong>{key}: </strong>
                        {features[key]}
                    </p>
                ))}
            </section>
        </>
    );
}
