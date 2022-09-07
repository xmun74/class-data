const { findAll, findById, update } = require("../controller/flightController");
const express = require("express");
const router = express.Router();

router.get("/", findAll); // GET http://localhost:4000/flight/

router.get("/:id", findById); // GET http://localhost:4000/flight/:id

router.put("/:id", update); // PUT http://localhost:4000/flight/:id

module.exports = router;
