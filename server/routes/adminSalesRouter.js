const express = require('express');
const router = express.Router();
   const {admingetSalesTotalRevenue ,admincreateSale,admingetDailySale,admingetWeeklySale,admingetMonthlySale}=require("../controllers/adminSalesController")

// Route to get the number of sales made in the last 24 hours

// router.route('/').get(admingetSalesTotalRevenue);

// router.route('/').get(admingetDailySale);

// router.route('/').post(admincreateSale);





router.post('/adminSalesData', admincreateSale); // Route for fetching countries
router.get('/admingetDailySale', admingetDailySale);       // Route for fetching states
router.get('/totalRevenue', admingetSalesTotalRevenue);   
router.get('/admingetweeklySale', admingetWeeklySale);   
router.get('/admingetmonthlySale', admingetMonthlySale);     // Route for fetching cities


module.exports = router;
