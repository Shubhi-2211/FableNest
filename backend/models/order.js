const mongoose= require("mongoose");
    const order=new mongoose.Schema({
        user:{                                                                    //ye id's hain
            //it contains single object not array because ek user ek time pe order kr sakta hai
            type:mongoose.Types.ObjectId, // which type of user or admin
            ref: "user",                                                         
        },
        book:{                                                                     //ye id's hain
            type: mongoose.Types.ObjectId,
            ref:"book",                                                       
        },  
        status:{
            type:String,
            default:"Order Placed",
            enum: ["Order Placed","Out for delivery","Delivered" ,"Cancelled"],
        },
    },
{timestamps:true} //order ko recent time ko dekh ke sort krne ke liye time stamp
);  
module.exports=mongoose.model("order",order); // 1st order is for the given reference and 2nd one as the variable name given above