import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './siteStyle.css';

import Navbar from "./components/navbar.jsx";
import Home from "./components/home.jsx";
import Vacations from "./components/vacations.jsx";
import Flights from "./components/flights.jsx";
import Hotels from "./components/hotels.jsx";
import FlightsHotels from "./components/flights&hotels.jsx";
import CarRentals from "./components/carRental.jsx";
import Cruises from "./components/cruises.jsx";
import ErrorPage from "./components/errorPage.jsx";

import Register from "./components/user/register.jsx";
import SignIn from "./components/user/signin.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/vacations",
    element: <Vacations />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/flights",
    element: <Flights />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/hotels",
    element: <Hotels />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/flights&hotels",
    element: <FlightsHotels />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/carRental",
    element: <CarRentals />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cruises",
    element: <Cruises />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);