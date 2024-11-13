const asyncHandler = require("express-async-handler");

const Sos=require("../models/sosModel")

const createSos = asyncHandler(async(req,res)=>{
    const{emailId,phone,uniqueCode}=req.body;
    if(!phone){
        return next({ statusCode: 400, message: "phone model should be must" });
    }
    try {
        const sosData= await Sos.create({
            emailId,
            phone,
            uniqueCode
        })
        res.status(201).json(sosData);
    } catch (error) {
        console.error('Error not stroing the sosdata:', error);
        res.status(500).json({ error: 'Data is not stroing in Sos Field' });
    }
})


const getSosDataByUniqueCode=asyncHandler(async(req,res)=>{
    try {
        const dataSos=await Sos.findByUniqueCode(req.params.uniqueCode);
        if(!dataSos){
            res.status(404).json({ error: 'Sos Id not found in dataBase' });
            return;
        }
        res.status(200).json(dataSos);
    } catch (error) {
        res.status(500).json({ error: 'Sos Not getting the uniqueCode' });
    }

});

const deleteSosDataByUniqueCode = asyncHandler(async(req, res) => {
    try {
        const dataSos = await Sos.findByUniqueCode(req.params.uniqueCode);
        if (!dataSos) {
            res.status(404).json({ error: 'Sos Id not found in database' });
            return;
        }
        await dataSos.deleteOne(); // Deleting the found document
        res.status(200).json({ message: 'Sos data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Sos data by uniqueCode' });
    }
});
const updateSosDataByUniqueCode = asyncHandler(async(req, res) => {
    try {
        const existingSos = await Sos.findByUniqueCode(req.params.uniqueCode);
        if (!existingSos) {
            return res.status(404).json({ error: "Sos not found" });
        }
        // Update the existing SOS document
        existingSos.set(req.body); // Set new data
        const updatedSos = await existingSos.save(); // Save the updated document
        res.status(200).json(updatedSos);
    } catch (error) {
        res.status(500).json({ error: "Failed to update Sos data" });
    }
});



module.exports={createSos,getSosDataByUniqueCode,deleteSosDataByUniqueCode,updateSosDataByUniqueCode};