const router=require("express").Router(); 
const User=require("../models/user");
const {authenticateToken}=require("./userAuth");

//add book to favourite
router.put("/add-book-to-favourite",authenticateToken ,async(req,res)=>{
    try {
        const {bookid,id}=req.headers; //id->authenticate token wali ki user hai 
        const userData=await User.findById(id);
        const isBookfavourite = userData.favourites.includes(bookid); //include function check if book is already present in fav.
        if(isBookfavourite){
            return res.status(200).json({message:"Book Already Present in Favourites"});
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}}); //push function kyuki favourites ek array contain krta hai aur fav. mein bhej denge
        return res.status(200).json({message:"Book Added to Favourites"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
});

//delete book from favourite
router.put("/delete-book-from-favourite",authenticateToken ,async(req,res)=>{
    try {
        const {bookid,id}=req.headers; //id->authenticate token wali ki user hai 
        const userData=await User.findById(id);
        const isBookfavourite = userData.favourites.includes(bookid); //include function check if book is already present in fav.
        if(isBookfavourite){ //agar exsist krti hain tb
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
        }
        //push function kyuki favourites ek array contain krta hai aur fav. mein bhej denge
        return res.status(200).json({message:"Book removed from favourites"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
});

//get favourites book of a user
router.get("/get-favourite-book",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers; //user ki id
        const userData= await User.findById(id).populate("favourites"); //populate function returns the favourites 
        const favouriteBooks=userData.favourites; //user ka sara data aa jaega usme se favourite utha lenge
        return res.json({
            status:"Success",
            data:favouriteBooks,
        });
    } catch (error) {
        return res.status(500).json({message:"An error occured"});
    }
});
module.exports=router;