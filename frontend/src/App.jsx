import React from "react";
import Navbar from "./components/Navbar";
import { Routes,Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";

const App = () => {

  //chechks if the cureent path is owner path or not then hides the navbar for owner path
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      { !isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          {/*<Routes path="/owner" element={<Owner />} />
          <Routes path="/about" element={<About />} /> */}
        </Routes>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
