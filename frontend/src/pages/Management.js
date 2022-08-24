import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";

const { TabPane } = Tabs;

function Management() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentAccount")).data.isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className={"mt-3 ms-3 me-3 bs"} style={{ backgroundColor: "white" }}>
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Management Portal</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Rooms" key="3">
          <AddRoom />
        </TabPane>
        <TabPane tab="Accounts" key="4">
          <Accounts />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Management;

// Management Portal - Bookings Tab

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = (await axios.get("/api/bookings/allbookings")).data;
      setBookings(data);
      setLoading(false);
    };
    fetchData().catch((error) => {
      console.log(error);
      setLoading(false);
      setError(true);
    });
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-light">
          <thead className="bs">
            <tr>
              <th>Booking ID</th>
              <th>Account ID</th>
              <th>Room</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.accountID}</td>
                    <td>{booking.room}</td>
                    <td>{booking.checkIn}</td>
                    <td>{booking.checkOut}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Management Portal - Rooms Tab

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = (await axios.get("/api/rooms/allrooms")).data;
      setRooms(data);
      setLoading(false);
    };
    fetchData().catch((error) => {
      console.log(error);
      setLoading(false);
      setError(true);
    });
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-light">
          <thead className="bs">
            <tr>
              <th>Room ID</th>
              <th>Room Name</th>
              <th>Room Type</th>
              <th>Cost Per Night</th>
              <th>Sleeps</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.costpernight}</td>
                    <td>{room.capacity}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Management Portal - Accounts Tab

export function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = (await axios.get("/api/accounts/allaccounts")).data;
      setAccounts(data);
      setLoading(false);
    };
    fetchData().catch((error) => {
      console.log(error);
      setLoading(false);
      setError(true);
    });
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Accounts</h1>
        {loading && <Loader />}
        <table className="table table-light table-bordered">
          <thead>
            <tr>
              <th>Account ID</th>
              <th>Account Name</th>
              <th>Email</th>
              <th>Manager</th>
            </tr>
          </thead>
          <tbody>
            {accounts &&
              accounts.map((account) => {
                return (
                  <tr>
                    <td>{account._id}</td>
                    <td>{account.name}</td>
                    <td>{account.email}</td>
                    <td>{account.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Management Portal - Room Tab

// Add Room Function

export function AddRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [costpernight, setCostPerNight] = useState();
  const [capacity, setCapacity] = useState();
  const [description, setDescription] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [type, setType] = useState();
  const [imageURL1, setImageURL1] = useState();
  const [imageURL2, setImageURL2] = useState();
  const [imageURL3, setImageURL3] = useState();

  async function addRoom() {
    const newRoom = {
      name,
      costpernight,
      capacity,
      description,
      phonenumber,
      type,
      imageurls: [imageURL1, imageURL2, imageURL3],
    };

    try {
      setLoading(true);
      const result = (await axios.post("/api/rooms/addroom", newRoom)).data;
      console.log(result);
      setLoading(false);
      Swal.fire(
        "Success!",
        "You've added a new room, which is available now.",
        "success"
      ).then((result) => {
        window.location.href = "/home";
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
    <div className="row">
      {loading && <Loader />}
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Room Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Cost Per Night"
          value={costpernight}
          onChange={(e) => {
            setCostPerNight(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Sleeps"
          value={capacity}
          onChange={(e) => {
            setCapacity(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </div>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Room Type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="ImageURL 1"
          value={imageURL1}
          onChange={(e) => {
            setImageURL1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="ImageURL 2"
          value={imageURL2}
          onChange={(e) => {
            setImageURL2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="ImageURL 3"
          value={imageURL3}
          onChange={(e) => {
            setImageURL3(e.target.value);
          }}
        />

        <div className="text-end">
          <button className="btn btn-primary mt-2" onClick={addRoom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}
