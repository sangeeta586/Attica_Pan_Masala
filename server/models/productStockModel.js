const mongoose=require('mongoose')

const productStockSchema=new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", // Assuming you have a User model
      },

    category:{
       type:String,
        required: true,
    },
    
    product_name:{
        type:String ,
        required: true,
    },
   published:{
    type:Boolean,
    required:true,
   },
   stockCount:{
    type:Number,
    required:true,
   },
   lastCount:{
    type:Number,
    required:true,
   },
   quality:{
    type: String,
        required: [true, "Please add the quality address"],
        enum: ['Low', 'Medium','High'],
        default: 'High'
   },
   vendor:{
    type:String,
    required:true,
   }
})

const productStock= mongoose.model('ProductStock', productStockSchema);

module.exports = productStock;