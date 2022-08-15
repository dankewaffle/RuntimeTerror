import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Divider, Tag } from 'antd';


const { TabPane } = Tabs;

function Account() {
  const account = JSON.parse(localStorage.getItem("currentAccount"));

  useEffect(() => {
    if (!account) {
      window.location.href = "/signin";
    }
  }, []);

  return (
    <div className="ms-3 mt-3 me-3 bs">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Account" key="1">
          <h1>My Account</h1>
          <br />
          <h1>Name: {account.data.name}</h1>
          <h1>Email: {account.data.email}</h1>
          <h1>isAdmin: {account.data.isAdmin ? "YES" : "NO"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Account;

export function MyBookings() {
  const account = JSON.parse(localStorage.getItem("currentAccount")).data;
  const [bookings, setBookings] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = (
        await axios.post("/api/bookings/accountbookings", {
          accountID: account._id,
        })
      ).data;
      console.log(data);
      setBookings(data);
      setLoading(false);
    };

    fetchData().catch((error) => {
      console.log(error);
      setLoading(false);
      setError(true);
    });
  }, []);

  async function cancelBooking(bookingID, roomID) {
    try {
      setLoading(true);
      console.log(bookingID);
      console.log(roomID);
      const result = (
        await axios.post("/api/bookings/cancel", {
          bookingID,
          roomID,
        })
      ).data;
      console.log(result);
      setLoading(false);
      Swal.fire(
        "Success",
        "You've sucessfully cancelled your booking.",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire(
        "Uh Oh!",
        "Something went wrong, please try again in a bit!",
        "error"
      );
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <h1>
                    <b>{booking.room}</b>
                  </h1>
                  <p>
                    <b>BookingID:</b> {booking._id}
                  </p>
                  <p>
                    <b>Check In:</b> {booking.checkIn}
                  </p>
                  <p>
                    <b>Check Out:</b> {booking.checkOut}
                  </p>
                  <p>
                    <b>Total Amount:</b> ${booking.totalCost}
                  </p>
                  <p>
                    <b>Booking Status:</b>{" "}
                    {booking.status === 'cancelled' ? (<Tag color="red">Cancelled</Tag>
                    ) : (<Tag color="green">Confirmed</Tag>
                    )}
                  </p>
                  {booking.status !== "cancelled" && (
                    <div
                      className="text-end"
                      onClick={() => {
                        cancelBooking(booking._id, booking.roomID);
                      }}
                    >
                      <button className="btn btn-primary">
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
