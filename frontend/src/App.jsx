import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import About from "./pages/About";
import Experience from "./pages/Experience";
import MyBookings from "./pages/MyBookings";
import HotelRegistration from "./components/HotelRegistration";
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import AddRoom from "./pages/hotelOwner/AddRoom";
import ListRoom from "./pages/hotelOwner/ListRoom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Loader from "./components/Loader";

const App = () => {
  //chechks if the cureent path is owner path or not then hides the navbar for owner path
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHotelRegistration } = useAppContext();

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHotelRegistration && <HotelRegistration />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/loader/:nextUrl" element={<Loader />} />
          <Route path="/owner-dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
