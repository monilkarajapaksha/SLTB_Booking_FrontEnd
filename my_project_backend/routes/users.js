const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = express.Router();
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User is not found");
  res.send(user);
});

router.post("/calculatecost", (req, res) => {
  let price;
  let initailvalue;
  let finalvalue;

  if (req.body != null) {
    switch (req.body.startLocation) {
      case "CA":
        initailvalue = 1;
        break;
      case "US":
        initailvalue = 2;
        break;
      case "DE":
        initailvalue = 3;
        break;
      case "FR":
        initailvalue = 4;
        break;
    }

    switch (
      req.body.endLocation // Use req.body.endLocation instead of req.params.endLocation
    ) {
      case "CA":
        finalvalue = 1;
        break;
      case "US":
        finalvalue = 2;
        break;
      case "DE":
        finalvalue = 3;
        break;
      case "FR":
        finalvalue = 4;
        break;
    }

    price = Math.abs(initailvalue - finalvalue) * 100;
    res.send(price.toString());
  } else {
    res.status(400).send("Bad Request: Missing parameters");
  }
});

router.put("/addlocation/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      startLocation: req.body.startLocation,
      endLocation: req.body.endLocation,
    },
    { new: true }
  );
  if (!user) {
    res.status(404).send("Given id was not found");
    return;
  }

  res.send(user);
});

module.exports = router;
