import React, { useState, useEffect } from "react";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signin() {
    const account = {
      email,
      password,
    };
    try {
      const result = await axios.post("/api/accounts/signin", account).data;
    } catch (error) {
      console.log(error);
    }
    console.log(account);
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <h2>Sign In to Your RuntimeTerror Members Account</h2>
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
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={signin}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
