const express = require("express");
const router = express.Router();
const Account = require("../objects/account");

router.post("/join", async (req, res) => {
  const newAccount = new Account(req.body);

  try {
    const account = await newAccount.save();
    res.send("Signin Created Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await Account.findOne({ email: email, password: password });
    if (account) {
      const protection = {
        name : account.name,
        email : account.email,
        isAdmin : account.isAdmin,
        _id : account._id,
      }
      res.send(protection);
    } else {
      return res.status(400).json({ message: "Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
