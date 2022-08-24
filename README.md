# RuntimeTerror
COMP 380L Group Project

Professor Abhishek Verma

Summer 2022

-------------------------

Contributers:

Ryan Jacobs

Natalie Wharton

Ravindu Gunasinghe

Talha Harooni

-------------------------

About:

-------------------------

This project is an interactive Hotel Booking web application, developed with a MERN stack.  

The codebase utilizes React and Bootstrap for the frontend, Express and Node.js for the backend, and MongoDB for the database.  The time/date is managed with Moment.js, and the payment gateway is powered by Stripe.  There is also a fully functioning account system along with a management portal with administrative options.

A user is able to create/sign in to an account, view available rooms/details, filter through room types based on keyword or type, select a desired date range & book/pay for a room, view booking details, and cancel bookings.  When a booking is created, that room is unavailable for other users during the date range that it was booked for.  A user with management privileges is able to view all bookings, all rooms, all users, and add a room directly from the management portal.

-------------------------

Frontend Dependencies:

    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "antd": "^4.22.4",
    "aos": "^2.3.4",
    "axios": "^0.27.2",
    "moment": "^2.29.4",
    "react": "^18.2.0",
    "react-bootstrap": "^2.5.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^5.3.3",
    "react-scripts": "5.0.1",
    "react-spinners": "^0.13.4",
    "react-stripe-checkout": "^2.6.3",
    "sweetalert2": "^11.4.26",
    "web-vitals": "^2.1.4"
    
Backend Dependencies:

    "express": "^4.18.1",
    "moment": "^2.29.4",
    "mongoose": "^6.5.2",
    "nodemon": "^2.0.19",
    "stripe": "^10.3.0",
    "uuid": "^8.3.2"
