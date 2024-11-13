const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
       },
       name :{
           type:String,
           require:[true, "Please add the category name"]

       },
       status: {
        type: String,
        required: [true, "Please add the status address"],
        enum: ['active', 'inactive'],
        default: 'active'
    },
    
      
},
{
   timestamps : true,
}

);
   

module.exports = mongoose.model('category', categorySchema);


