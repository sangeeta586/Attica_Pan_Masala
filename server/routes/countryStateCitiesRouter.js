// countryStateCitiesRoutes.js

const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const { getCountries,getStates ,getCities } = require("../controllers/countryStateCitiesController");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// router.get('/',getCountries);
// router.get('/',getStates);
// router.get('/',getCities);
router.get('/countries', getCountries); // Route for fetching countries
router.get('/states', getStates);       // Route for fetching states
router.get('/cities', getCities);       // Route for fetching cities



module.exports = router;
