const router=require("express").Router(); //express ka router function ki need hai
const User=require("../models/user"); //iski help se check kr paenge ki user exsits toh nhi krta
const bcrypt =require("bcryptjs");
const jwt=require("jsonwebtoken");
const {authenticateToken}=require("./userAuth");

//Sign up kr sake user
//4 cheez user se le rhe naam email password address validate it also
 
router.post("/sign-up",async(req,res)=>{  //data ko yahan pe bhejna hai //call back bann chuka hai
 try{
    const{username,email,password,address}=req.body; //saari cheezen yahan se le li

    //check username length more than 3
    if(username.length<4){
        return res.status(400).json({message:"Username length must be greater than 3"});      
    }
    //check username already exsits
    const existingUsername= await User.findOne({username:username}); //database mein map krega ki entered user name database mein toh nhi hai
    if(existingUsername) {
        return res.status(400).json({message:"Username already exsists"});
    }
    //check email already exsists?
    const existingEmail= await User.findOne({email:email}); //database mein map krega ki entered email database mein toh nhi hai
    if(existingEmail) {
        return res.status(400).json({message:"Email already exsists"});
    }
     //check password length already exsists?
     if(password.length<6){
         return res.status(400).json({message:"Password's length should be greater than 5"});
     }
     const hashPass=await bcrypt.hash(password,10);
     const newUser=new User( // new user aa jaega aur saari value fill ho jaengi jo entered hai
        {
            username:username,
            email:email,
            password:hashPass,
            address:address
        }
    ); 
    await newUser.save(); //database mein save kr diya
    return res.status(200).json({message:"SignUp Successfull"});
 }
 catch(error){
    res.status(500).json({message:"Internal Server Error"}); //200 ->sucess 400 ->user error 500->backend error

 }
}
); 

//Sign-in
router.post("/sign-in",async(req,res)=>{  //data ko yahan pe bhejna hai //call back bann chuka hai
    try{
       const {username,password}=req.body;
       const existingUser= await User.findOne({username});
       if(!existingUser){
        
        res.status(400).json({message:"Invalid Credentials"});
       }

       await bcrypt.compare(password,existingUser.password, (err,data)=>{//existingUser ka hum log database mein password check karenge and callback function ke 2 parameters hain err and data
        if(data){   //agar data available hai
            const authClaims = [
                {name:existingUser.username},
                {role:existingUser.role},
            ];
            const token=jwt.sign({authClaims},"bookStore123",{
                expiresIn:"30d",
            }); //bookStore123 is secret key wherever jwt is used bookStore123 is used as secret key
            res.status(200).json({
                id:existingUser._id,
                role: existingUser.role,
                token:token
            });
        }
        else{
            res.status(400).json({message:"Invalid Credentials"});
        }
       }); 
    }
    catch(error){
       res.status(500).json({message:"Internal Server Error"}); //200 ->sucess 400 ->user error 500->backend error
    }
   }
   ); 

//get user information
router.get("/get-user-information",authenticateToken,async(req,res)=>{
try {
    const {id}=req.headers;
    const data=await User.findById(id).select("-password"); //- means exclude krna hai
    return res.status(200).json(data);
} catch (error) {
    res.status(500).json({message:"Internal Server Error"});
}
});

//update address
router.put("/update-address",authenticateToken, async (req,res)=> { //to update anything we use put request
    try {
        const {id}=req.headers; //req.headers mein se iski id uthaenge
        const {address}=req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address Updated Successfully"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
}); 

module.exports=router;