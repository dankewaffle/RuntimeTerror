import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import comparePasswords from "../components/Util";
import { createAccount } from "../components/Util";

function Join() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  function join() {
    if (comparePasswords(password, confirmPassword) === true) {
      createAccount(
        name,
        email,
        password,
        confirmPassword,
        setLoading,
        setSuccess,
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        setError
      );
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Account created successfully!" />}
          <div className="bs" style={{ backgroundColor: "white" }}>
            <h2>Join RuntimeTerror Members</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={join}>
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
