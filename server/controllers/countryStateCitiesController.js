const Country = require("../models/countryModel");
const States = require("../models/stateModel");
const City = require('../models/cityModel');

const getCountries = async (req, resp) => {

    try {
        const countries = await Country.find({});
        resp.status(200).send({ success: true, msg: 'Countries data', data: countries })

    }
    catch (error) {
        resp.status(400).send({ success: false, msg: error.message });
    }

}



const getStates = async(req ,res)=>{
    try{
      const states = await States.find({country_short_name:req.body.short_name});
      res.status(200).send({success:true , msg:'States data',data:states})
    }
    catch(error){
       res.status(400).send({success:false , msg:error.message});
    }

}
const getCities = async(req ,res)=>{
    try{
      const cities = await City.find({
        state_name:req.body.state_name});   //module -frontend modified
      res.status(200).send({success:true , msg:'Cities data',data:cities})
    }
    catch(error){
       res.status(400).send({success:false , msg:error.message});
    }

}

module.exports={getCountries,getStates,getCities}


