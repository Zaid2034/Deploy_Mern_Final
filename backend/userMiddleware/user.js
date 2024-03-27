const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config')

function userMiddleware(req,res,next){
    const token=req.headers.authorization
    const word=token.split(" ");
    const realToken=word[1];
    console.log(realToken)
    const decodedUser=jwt.verify(realToken,JWT_SECRET)
    console.log(decodedUser.username)
    if(decodedUser.username){
        req.username=decodedUser.username
        next();
    }else{
        res.status(404).json({
            msg:"Incorrect email and password"
        })
    }
}
module.exports=userMiddleware