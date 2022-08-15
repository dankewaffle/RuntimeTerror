import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { DatePicker, Space } from "antd";
import moment from "moment";

function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { RangePicker } = DatePicker;
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [duplicates, setDuplicates] = useState([]);

  // deprecated react code
  /*
    useEffect(async() => {
        try {
            setLoading(true)
            const data = (await axios.get('/api/rooms/allrooms')).data

            setRooms(data)
            setLoading(false)
        } catch (error) {
            setError(true)
            console.log(error)
            setLoading(false)
        }
    }, []);
*/

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = (await axios("/api/rooms/allrooms")).data;

      setRooms(data);
      setDuplicates(data);
      setLoading(false);
    };

    fetchData().catch((error) => {
      setError(true);
      console.log(error);
      setLoading(false);
    });
  }, []);

  function filterByDate(dates) {
    setCheckIn(moment(dates[0]).format("MM-DD-YYYY"));
    setCheckOut(moment(dates[1]).format("MM-DD-YYYY"));

    var tempRooms = [];
    var availability = false;

    for (const room of duplicates) {
      if (room.bookedrooms.length > 0) {
        for (const booking of room.bookedrooms) {
          if (
            !moment(moment(dates[0]).format("MM-DD-YYYY")).isBetween(
              booking.checkIn,
              booking.checkOut
            ) &&
            !moment(moment(dates[1]).format("MM-DD-YYYY")).isBetween(
              booking.checkIn,
              booking.checkOut
            )
          ) {
            if (
              moment(dates[0]).format("MM-DD-YYYY") !== booking.checkIn &&
              moment(dates[0]).format("MM-DD-YYYY") !== booking.checkOut &&
              moment(dates[1]).format("MM-DD-YYYY") !== booking.checkIn &&
              moment(dates[1]).format("MM-DD-YYYY") !== booking.checkOut
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability == true || room.bookedrooms.length == 0) {
        tempRooms.push(room);
      }

      setRooms(tempRooms);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker format="MM-DD-YYYY" onChange={filterByDate} />
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length > 1 ? (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-3">
                <Room room={room} checkIn={checkIn} checkOut={checkOut} />
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Home;
