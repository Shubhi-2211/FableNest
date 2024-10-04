const {authenticateToken}=require("./userAuth");
const Book=require("../models/book");
const Order=require("../models/order");
const router=require("express").Router();
const User=require("../models/user");

//place order
router.post("/place-order",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const {order}=req.body;
        // order ek array hai aur orderData uska ek element
        for(const orderData of order){ //for loop
            const newOrder=new Order({     //book konsi hai jiska order create kiya gya hai 
                user: id, 
                book: orderData._id                      //book->objecId
            });
            const orderDatafromDB= await newOrder.save(); //objectid bhi mil jaegi aur sara data bhi
            //saving order in user model
            await User.findByIdAndUpdate(id,{
                $push:{orders:orderDatafromDB._id}, //uss object ki id orders mein push kr denge
            });
            //Clearing cart order place krne ke baad
            await User.findByIdAndUpdate(id,{
                $pull:{cart:orderData._id},
            });
        } 

        //loop finish hone ke baad order place ho jaega
        return res.json({
            status:"Success",
            message:"Order Placed Successfully",
        });

    } catch (error) {
        return res.status(500).json({message:"An error Occured"});
    }
});

//get order history of particular user
router.get("/get-order-history",authenticateToken,async(req,res)=>{
    try { 
        const {id}=req.heqaders;                    //user pata chal jaega
        const userData=await User.findById(id).populate({ //populate function returns all the orders
            path:"orders",
            populate:{path:"book"}, //kis book ka order aaya hai aur kis user ka
        });

        const ordersData=userData.orders.reverse();
        return res.json({
            status:"Success",
            data:ordersData,
        });
    } catch (error) {
        return res.status(500).json({message:"An error Occured"});
    }
});

//get all orders --admin role
router.get("/get-all-orders",authenticateToken,async(req,res)=>{
    try {
        const userData=await Order.find().populate({
            path:"book",                    //returns which books are in order
        })
        .populate({
            path:"user",                   //return which user has places order for the books
        })
        .sort({createdAt: -1});
        return res.json({
            status:"Success",
            data:userData,
        }); 
    } catch (error) {
        return res.status(500).json({message:"An error Occured"});
    }
});

//update order
router.put("/update-status/:id",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.params; //user ki id hai ye
        await Order.findByIdAndUpdate(id,{
            status:req.body.status,
        });
        return res.json({
            status:"Success",
            message:"Status Updated Successfully",
        });
    } catch (error) {
        return res.status(500).json({message:"An error Occured"});
    }
});
module.exports=router;