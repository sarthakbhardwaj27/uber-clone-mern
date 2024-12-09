const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");

router.post('/register', [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name should be 3 letters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
    body("vehicle.color").isLength({ min: 3}).withMessage("Vehicle color should be at least 3 letters"),
    body("vehicle.plate").isLength({ min: 3}).withMessage("Vehicle plate should be at least 3 letters"),
    body('vehicle.capacity').isLength({ min: 1}).withMessage("Vehicle capacity should be at least 1"),
    body('vehicle.vehicleType').isIn(['car', 'auto', 'bike']).withMessage("Vehicle type should be either 'car', 'auto', or 'bike'")
], captainController.registerCaptain)


module.exports = router;