import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";

function Book({ match }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  const roomID = match.params.roomid;
  const checkIn = moment(match.params.checkIn, "MM-DD-YYYY");
  const checkOut = moment(match.params.checkOut, "MM-DD-YYYY");
  const duration = moment.duration(checkOut.diff(checkIn)).asDays();
  const [totalCost, setTotalCost] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = (
        await axios.post("/api/rooms/roomid", {
          roomid: match.params.roomid,
        })
      ).data;
      setTotalCost(data.costpernight * duration);
      setRoom(data);
      setLoading(false);
    };
    fetchData().catch((error) => {
      setError(true);
      console.log(error);
      setLoading(false);
    });
  }, []);

  async function bookRoom() {
    const bookingDetails = {
      room,
      accountID: JSON.parse(localStorage.getItem('currentAccount')).data._id,
      checkIn,
      checkOut,
      totalCost,
      duration,
    };
    try {
      const result = await axios.post("/api/bookings/book", bookingDetails);
    } catch (error) {console.log("bitch")}
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-5">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" alt="" />
            </div>
            <div className="col-md-7">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />

                <p>
                  <b>Name: </b>{JSON.parse(localStorage.getItem('currentAccount')).data.name}
                </p>
                <p>
                  <b>Check In: </b>
                  {match.params.checkIn}
                </p>
                <p>
                  <b>Check Out: </b>
                  {match.params.checkOut}
                </p>
                <p>
                  <b>Available Rooms: </b> {room.available}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <h1>Available Rate</h1>
                <hr />
                <p>
                  <b>Price Per Night: </b>${room.costpernight}
                </p>
                <p>
                  <b>Total Nights: </b>
                  {duration}
                </p>
                <p>
                  <b>Total Room Charge: </b>${totalCost}
                </p>
              </div>

              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={bookRoom}>
                  Book Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Book;
