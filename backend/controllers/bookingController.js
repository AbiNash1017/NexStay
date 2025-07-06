import transporter from '../configs/nodemailer.js';
import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import Room from "../models/Room.js";
import stripe from 'stripe';

//Function to chcek avilability of the room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        });

        const isAvailable = bookings.length === 0;
        return isAvailable;

    } catch (error) {
        console.error("Availability check failed:", error.message);
        throw new Error("Failed to check availability");
    }
};

//API to check avilability of room
//POST/api/bookings/check-avilability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });

        res.json({ success: true, isAvailable });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//API to create a new booking
//POST/api/bookings/book
export const createBookings = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        //Before Booking check Avilability
        const isAvailable = await checkAvailability({
            checkInDate, checkOutDate, room
        });

        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not available" });
        }

        //Get totalPrice from Room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        //Calculate totalPrice based on nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: 'Your NexStay Booking Confirmation',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 40px; color: #333;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                <h1 style="color: #2c3e50; font-size: 26px; margin-bottom: 10px;">🌟 Your NexStay Booking Is Confirmed!</h1>
                <p style="font-size: 16px;">Dear <strong>${req.user.username}</strong>,</p>
      
                <p style="font-size: 15px; line-height: 1.6;">
                Thank you for choosing <strong>NexStay</strong> — where comfort meets elegance. We’re delighted to confirm your booking and can’t wait to host you. Below are your reservation details:
                </p>
      
                <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; font-weight: bold;">📌 Booking ID:</td>
                        <td style="padding: 8px;">${booking._id}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-weight: bold;">🏨 Hotel Name:</td>
                        <td style="padding: 8px;">${roomData.hotel.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; font-weight: bold;">📍 Location:</td>
                      <td style="padding: 8px;">${roomData.hotel.address}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; font-weight: bold;">📅 Check-In Date:</td>
                      <td style="padding: 8px;">${booking.checkInDate.toDateString()}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; font-weight: bold;">💳 Booking Amount:</td>
                      <td style="padding: 8px;">${process.env.CURRENCY || '$'} ${booking.totalPrice} / night</td>
                    </tr>
                </table>
      
                <p style="margin-top: 30px; font-size: 15px; line-height: 1.6;">
                We are committed to making your stay exceptional. If you have any special requests or need to modify your booking, please do not hesitate to reach out to our concierge team.
                </p>
      
                <p style="margin-top: 20px; font-size: 15px;">Warm regards,</p>
                <p style="font-size: 15px;"><strong>The NexStay Concierge Team</strong></p>

                <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;" />

                <p style="font-size: 13px; color: #888888; text-align: center;">
                Need help? Contact us at <a href="mailto:support@nexstay.com" style="color: #3498db;">support@nexstay.com</a>
                </p>
                </div>
                </div>
            `
        }

        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: "Booking Created Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to create Bookings" });
    }
};

//API to get all bookings for a user
//GET/api/bookings/user
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 });

        res.json({ success: true, bookings });

    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings!" });
    }
};

//API to get booking details of a particular owner
export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotel) {
            return res.json({ success: false, message: "No Hotel found" });
        }
        const bookings = await Booking.find({ hotel: hotel._id }).populate("room hotel user").sort({ createdAt: -1 });

        //Total Bookings
        const totalBookings = bookings.length;
        //Total Revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

        res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } });

    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings!" });
    }
};

//Function for Stripe Payement
export const stripePayment = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId);
        const roomData = await Room.findById(booking.room).populate('hotel');
        const totalPrice = booking.totalPrice;
        //origin url of our frontend
        const { origin } = req.headers;

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = [{
            price_data: {
                currency: "usd",
                product_data: {
                    name: roomData.hotel.name,
                },
                unit_amount: totalPrice * 100
            },
            quantity: 1,
        }];

        //create checkout Session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            metadata: {
                bookingId,
            }
        });

        res.json({ success: true, url: session.url });

    } catch (error) {
        res.json({ success: false, message: "payement Failed!" });
    }
};