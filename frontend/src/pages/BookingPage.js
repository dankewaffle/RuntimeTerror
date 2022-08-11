import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";

function BookingPage({ match }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await axios.post("/api/rooms/roomid", {
        roomid: match.params.roomid,
      });

      setRoom(data.data);
      setLoading(false);
    };
    fetchData().catch((error) => {
      setError(true);
      console.log(error);
      setLoading(false);
    });
  }, []);

  return (
    <div className="m-5">
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error...</h1>
      ) : (
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
                  <b>Name: </b>{" "}
                </p>
                <p>
                  <b>From: </b>{" "}
                </p>
                <p>
                  <b>To: </b>{" "}
                </p>
                <p>
                  <b>Available Rooms: </b> {room.available}
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <h1>Available Rate</h1>
                <hr />
                <p>
                  <b>Price Per Night: </b>
                  {room.costpernight}
                </p>
                <p>
                  <b>Total Nights: </b>{" "}
                </p>
                <p>
                  <b>Total Room Charge: </b>{" "}
                </p>
              </div>

              <div style={{ float: "right" }}>
                <button className="btn btn-primary">Book Reservation</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingPage;
