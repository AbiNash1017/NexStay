import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const RecommendedHotel = () => {

    const { rooms, searchedCities } = useAppContext();

    const [recommended, setRecommended] = useState([]);

    const filterHotels = () => {
        const filteredHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city));
        setRecommended(filteredHotels);
    };

    useEffect(() => {
        filterHotels();
    }, [rooms, searchedCities]);

    //here the return will be true only if there is a room or more than 0
    return recommended.length > 0 && (
        <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-100 py-20">
            <Title title='Recommended Hotels' subTitle='Curated with care exclusively for your travel preferences — experience handpicked stays that blend elegance, comfort, and unforgettable hospitality at every turn.' />
            <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
                {recommended.slice(0, 4).map((room, index) => (
                    <HotelCard key={room._id} room={room} index={index} />
                ))}
            </div>

        </div>
    );
};

export default RecommendedHotel;
