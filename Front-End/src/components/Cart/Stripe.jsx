import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePublicKey = 'YOUR_STRIPE_PUBLIC_KEY';

export default function StripeForm() {
    const [errorMessage, setErrorMessage] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            console.log('Payment successful:', paymentMethod);
            // Handle successful payment
        }
    };

    return (
        <div>
            <h1>Furniture Store</h1>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit">Pay Now</button>
            </form>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}
