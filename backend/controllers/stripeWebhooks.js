import stripe from 'stripe'
import Booking from '../models/Booking.js';

//API to handle Stripe Webhooks
export const stripeWebhooks = async (request, response) => {
    //stripe Gateway Initialization
    const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
    const signature = request.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(request.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
       return response.status(400).send(`webhook Error: ${error.message}`);
    }

    //Hanle the evnet
    if (event.type === 'payment_intent.succeeded') {
        const payementIntent = event.data.object;
        const payementIntentId = payementIntent.id;

        //Getting Session Metadata
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: payementIntentId,
        });

        const { bookingId } = session.data[0].metadata;

        //Mark Payement as Paid
        await Booking.findByIdAndUpdate(bookingId, { isPaid: true, paymentMethod: "stripe" });
    } else {
        console.log("Unhandled event type: ", event.type);
    }
    response.json({ received: true });
};