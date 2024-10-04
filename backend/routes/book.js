const router=require("express").Router(); 
const User=require("../models/user"); 
const jwt=require("jsonwebtoken");
const Book=require("../models/book");
const {authenticateToken}=require("./userAuth");

//add book --admin ye sab api's hain
router.post("/add-book",authenticateToken, async(req,res)=>{
    try {
        const {id}= req.headers;
        const user=await User.findById(id);
        if(user.role !=="admin"){
            return res.status(400).json({message:"You do not have access to perform this action."});
        }
        const book= new Book({
            url: req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });
        await book.save();
        return res.status(200).json({message:"Book added successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
});

//update book --admin
router.put("/update-book",authenticateToken, async(req,res)=>{
    try {
        const { bookid }= req.headers; //headers se bookid ko bhejega
        await Book.findByIdAndUpdate(bookid,{   //mongoose function findByIdAndUpadate
            url: req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });
        return res.status(200).json({message:"Book Updated successfully"});
    } catch (error) {
        return res.status(500).json({message:"An error occured"});
    }
});

//delete book --admin
router.delete("/delete-book",authenticateToken,async (req,res)=>{
    try {
        const { bookid }= req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message:"Book Deleted successfully"});

    } catch (error) {
        return res.status(500).json({message:"An error occured"});
    }
});

//get all books --public api's
router.get("/get-all-books",async(req,res)=>{  //only get data from database isliye get request //get-all-books vo route hai mtlab path hai
    try{
        const books=await Book.find().sort({createdAt:-1}); //recently added upar hoga 
        return res.status(200).json({
            status:"Success",
            data:books,
        });
    }
    catch(eroor){
        return res.status(500).json({message:"An error Occured"});
    }
});

//get recently added book limit to 4 --public api's
router.get("/get-recent-books",async(re,res)=>{
try {
    const books= await Book.find().sort({createdAt:-1}).limit(4);
    return res.status(200).json({
        status:"Success",
        data:books,
    });
    
} catch (error) {
    return res.status(500).json({message:"An internal error"});
}
});

//get book by id --public api's
router.get("/get-book-by-id/:id",async(req,res)=>{
    try {
        const {id}=req.params; //jo url hota hai wahan se hum uss id ko utha lenge //headers can also be used
    const book=await Book.findById(id);
    return res.status(200).json({
        status:"Success",
        data:book,
    });
    } catch (error) {
        return res.status(500).json({message:"An internal error"});
    }
});
module.exports=router;
