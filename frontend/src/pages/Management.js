import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

function Management() {

  useEffect(() => {
    if(!JSON.parse(localStorage.getItem("currentAccount")).data.isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className={"mt-3 ms-3 me-3 bs"}>
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
          <h1>Add Rooms</h1>
        </TabPane>
        <TabPane tab="Accounts" key="4">
          <Accounts />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Management;

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
        {loading && <Loader/>}
        <table className="table table-light table-bordered">
          <thead>
            <tr>
              <th>Account ID</th>
              <th>Account Name</th>
              <th>Email</th>
              <th>Is Admin</th>
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
