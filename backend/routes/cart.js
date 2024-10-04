const router=require("express").Router(); 
const User=require("../models/user");
const {authenticateToken}=require("./userAuth");

//put book to cart
router.put("/add-to-cart",authenticateToken, async(req,res)=>{
    try {
        const {bookid,id}=req.headers;
        const userData= await User.findById(id);
        const isBookinCart=userData.cart.includes(bookid); //if book is already present in cart
        if(isBookinCart){
            return res.json({
                status:"Success",
                message:"Book already present in cart",
            });
        }
        await User.findByIdAndUpdate(id,{
            $push:{cart:bookid},
        });
        return res.json({   
            status:"Success",
            message:"Book added to cart",
        });
    } catch (error) {
        return res.status(500).json({message:"An error occured"});
    }
});

//remove from cart
router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try{
    const {bookid}=req.params;
    const{id}=req.headers;
        await User.findByIdAndUpdate(id,{
        $pull:{cart:bookid},
    });
    return res.json({
        status:"Success",
        message:"Book removed from cart successfully",
    });
}
catch(error){
    return res.status(500).json({message:"An error occured"});
}
});

//get cart of a particular user
router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers;
        const userData =await User.findById(id).populate("cart"); 
        const cart= userData.cart.reverse();
        return res.json({
            status:"Success",
            data:cart,
        });

    } catch (error) {
        return res.status(500).json({message:"An error occured"});
    }
});

//
module.exports=router;