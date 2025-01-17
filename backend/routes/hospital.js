const express = require("express");
const router = express.Router();
const HospitalController = require("../controllers/HospitalController");

router.get("/", HospitalController.getHospitals);

module.exports = router;
