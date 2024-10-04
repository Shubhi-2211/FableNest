const jwt=require("jsonwebtoken");

const authenticateToken=(req,res,next)=>{ //function creation , next matlb iske aage ka kya kaam krna
    const authHeader=req.headers["authorization"];
    const token= authHeader && authHeader.split(" ")[1]; //Bearer "generated token" //authorization ki key hum log harr baar le rhe

    if(token==null){
        return res.status(401).json({message:"Authentication Token required"});
    }

    jwt.verify(token,"bookStore123",(err,user)=>{
        if(err){
            return res.status(403).json({message:"Token Expired. Please Sign-In Again."});
        }
        req.user=user;
        next();
    });
};
module.exports={authenticateToken};