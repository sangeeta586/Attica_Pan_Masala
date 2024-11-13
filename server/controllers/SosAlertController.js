
const asyncHandler = require("express-async-handler");
const Sos=require("../models/sosModel")
const SosAlert=require("../models/SosAlertModel")






const deleteSosAlertDataByUniqueCode = asyncHandler(async (req, res) => {
    try {
        const dataSos = await SosAlert.findOne({ uniqueCode: req.params.uniqueCode });
        if (!dataSos) {
            return res.status(404).json({ error: 'SosAlert Id not found in database' });
        }
        await dataSos.deleteOne(); // Deleting the found document
        return res.status(200).json({ message: 'SosAlert data deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to delete Sos data by uniqueCode' });
    }
});



const createSosAlert = asyncHandler(async (req, res) => {
    
    const { uniqueCode } = req.params;
    try {
        // Find SOS data by unique code
        const dataSos = await Sos.findByUniqueCode(uniqueCode);
        
        // If SOS data not found, return 404
        if (!dataSos) {
            return res.status(404).json({ error: 'SOS ID not found in database' });
        }
        
        // Create new SOS alert entry
        const sosData = await SosAlert.create({
            emailId:dataSos.emailId,
            phone:dataSos.phone,
            uniqueCode:dataSos.uniqueCode,
            alert:true
        });

        // Return the created SOS alert data
        return res.status(201).json({sosData ,message:"Stored in  SosAlert Database "});
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error in creating database in SosAlert' });
    }
});


const getSosAlertDataByUniqueCode = asyncHandler(async (req, res) => {
    try {
        const dataSos = await SosAlert.findOne({ uniqueCode: req.params.uniqueCode });
        if (!dataSos) {
            return res.status(404).json({ error: 'SosAlert Id not found in database' });
        }
        return res.status(200).json(dataSos);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to get SosAlert data by uniqueCode' });
    }
});


const updateSosAlertDataByUniqueCode = asyncHandler(async (req, res) => {
    try {
        const existingSos = await SosAlert.findOne({ uniqueCode: req.params.uniqueCode });
        if (!existingSos) {
            return res.status(404).json({ error: "SosAlert not found" });
        }

        // Update the existing SOS document
        existingSos.set(req.body); // Set new data
        const updatedSos = await existingSos.save(); // Save the updated document

        return res.status(200).json(updatedSos);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Failed to update SosAlert data" });
    }
});

const getAllAlertSms = asyncHandler(async (req, res) => {
    try {
        const dataSos = await SosAlert.find();
        if (!dataSos) {
            return res.status(404).json({ error: 'SosAlert Id not found in database' });
        }
        return res.status(200).json(dataSos);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to get SosAlert data by uniqueCode' });
    }
})

const getlatestSosAlertSms = asyncHandler(async (req, res) => {
    try {
        const latestSosAlert = await SosAlert.findOne().sort({ smsTimestamp: -1 });
        if (!latestSosAlert) {
            return res.status(404).json({ error: 'SosAlert not found in database' });
        }
        return res.status(200).json(latestSosAlert);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to get SosAlert data' });
    }
});




module.exports={
    createSosAlert, deleteSosAlertDataByUniqueCode ,getSosAlertDataByUniqueCode ,updateSosAlertDataByUniqueCode,getAllAlertSms,getlatestSosAlertSms
};