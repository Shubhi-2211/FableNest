const express=require("express"); //express ko require kr liya variable ke andar
const app=express();// sari functionality express ki app mein le li
const cors=require("cors");//cors policy helps in transferring data from backend to frontend and vice-versa

app.use(cors());
app.use(express.json()); //data kis format mein bhejna hai
require("dotenv").config(); //dotenv humne require kr liya aur usme ek function hoga config()
require("./connection/conn");
const user=require("./routes/user");
const Books=require("./routes/book");
const favourite=require("./routes/favourite");
const Cart=require("./routes/cart");
const Order=require("./routes/order");

//routes
app.use("/api/v1",user); //uper jo require kiya gya hai vo user hai
app.use("/api/v1",Books);//uper jo require kiya gya hai vo Books hai
app.use("/api/v1",favourite);
app.use("/api/v1",Cart);
app.use("/api/v1",Order);

//to check server has started 
//app.get("/",(req,res)=>{ //get is used to get something from server
 //   res.send("Hello from backend side");
//});
//creating port
app.listen(process.env.PORT,() =>{ //1000 is port number // .env file ka port
    console.log(`Server Started at port ${process.env.PORT}`);
});