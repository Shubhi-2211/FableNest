const mongoose=require("mongoose"); // for creating schemas the function are provided by moongose
const user= new mongoose.Schema({
    username:{
        type: String,
        required:true, // without username hum aage nhi badh paenge
        unique: true,
    },
    email:{
        type: String,
        required:true, // without email hum aage nhi badh paenge
        unique: true,
    },
    password:{
        type: String,
        required:true, // without username hum aage nhi badh paenge
    },
    address:{
        type: String,
        required:true, 
    },
    avatar:{       //icon or profile picture
        type: String,
        default:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role:{
        type:String,
        default:"user",
        enum: ["user","admin"], //roles that can be assigned
    },
    favourites:[
        {
         type: mongoose.Types.ObjectId,
        ref: "book",
    },
    ],//array []
    cart:[
    {
    type: mongoose.Types.ObjectId,
    ref: "book",
    },
    ],
orders:[
    {
    type: mongoose.Types.ObjectId,
    ref: "order", //ref->reference is order here 
    },
],
},
{timestamps:true} //do cheezen aa jati hai createdAt and updatedAt
);

module.exports=mongoose.model("user",user); //execute user schema