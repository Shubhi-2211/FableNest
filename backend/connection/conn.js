const mongoose=require("mongoose");

const conn = async () =>{
    try{  
        await mongoose.connect(`${process.env.URI}`); //URL through which we can connect to database
        console.log("Connected to database");
    } catch (error){
        console.log(error)
    }
}
conn();// to run the function 