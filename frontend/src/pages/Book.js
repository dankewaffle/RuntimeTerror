import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

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

      if(!localStorage.getItem('currentAccount')) {
        window.location.href='/signin'
      }

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

  async function onToken(token) {
    console.log(token)
    const bookingDetails = {
      room,
      accountID: JSON.parse(localStorage.getItem("currentAccount")).data._id,
      checkIn,
      checkOut,
      totalCost,
      duration,
      token
    };
    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/book", bookingDetails);
      setLoading(false);
      Swal.fire('Success!' , 'Your room is booked!  We can\'t wait for your stay!', 'success').then(result=>{
        window.location.href='/bookings/'
      });
    } catch (error) {
      setLoading(false)
      Swal.fire('Uh Oh!' , 'Something went wrong, please try again in a bit!', 'error');
    }
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
                  <b>Sleeps: </b> {room.capacity}
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
                <StripeCheckout
                    amount={totalCost * 100}
                    token={onToken}
                    currency='USD'
                    stripeKey="pk_test_51LWnWELbmQqDgABX1iDAEWuOhTxsZGaVHzP08xjTOpSdhPvMte16n8qFyPrxr4TmGOBqQuNMl9AcFsjUalOTRWHt00XQrBVOfT"
                >
                  <button className="btn btn-primary">
                    Book Reservation
                  </button>
                </StripeCheckout>
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
