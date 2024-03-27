const express=require('express')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('./config')
const userMiddleware=require('./userMiddleware/user')
const bodyParser = require('body-parser');
const {CreateUserTable, insertUser,getItemWithName,updateUserMark,CreateUserPurchaseTable}=require('./database/createTable')
const { getClient } =require("./utils");
const faker = require('faker');
const cors=require('cors')
const {generateShoppingItemData}=require('./database/fakeData')
const sendOTP=require('./sendingOtp')

const app=express()
app.use(bodyParser.json())
 //app.use(cors());
  app.use(cors({
    origin:[''],
    methods:['POST','GET'],
    credentials:true
  }));
//client.connect();
//CreateUserTable()
//CreateItemTable()
//CreateUserPurchaseTable()
const itemsInList=generateShoppingItemData(faker)
app.post('/signUp',async(req,res)=>{
    const username=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const checkQuery='SELECT * FROM user4 WHERE username=$1 AND email=$2'
    const checkValue=[username,email]
    const client=await getClient()
    let response=await client.query(checkQuery,checkValue);
    if(response.rowCount>0){
      res.json({
        msg:"username or email already existed"
      })
    }else{
      await insertUser(username,email,password)
      const token=jwt.sign({
        username
      },JWT_SECRET);
      console.log(`Token is: ${token}`)
      res.json({
        msg:"User created Successfully",
        token
      });
      await client.end();
    }
 });
 app.post('/signIn',async (req,res)=>{
  const email=req.body.email
  const username=req.body.name
  const password=req.body.password
  const checkQuery='SELECT * FROM user4 WHERE username=$1 AND password=$2'
  const checkValue=[username,password]
  const client=await getClient()
  let response=await client.query(checkQuery,checkValue);
  console.log(`response row count is:${response.rowCount}`)
  if(response.rowCount>0){
    const token=jwt.sign({
      username
    },JWT_SECRET);
    res.json({
      token
    })
  }else{
    res.status(411).json({
      msg:"User does not Exist"
    })
  }

  await client.end();
 });
 app.get('/shopping_items',userMiddleware,async(req,res)=>{
  const username=req.username
  const itemsArr=await getItemWithName(itemsInList,username)
  res.json({
    itemsArr,
    username
  })
 })
 app.post('/shopping_items_update',userMiddleware,async(req,res)=>{
  const username=req.username
  const itemId=req.body.id
  updateUserMark(itemId,username)
  res.json({
    msg:"User Updated Successfully"
  })
 })
 app.post('/sendOtp',(req,res)=>{
  const email=req.body.email;
  const otp=req.body.otp;
  sendOTP(email,otp)

 })
 app.post('/verifyEmail',(req,res)=>{
  const email=req.body.email;
  const otp=req.body.otp;
  const generatedOtp=req.body.generatedOtp;
  console.log(`generated Otp ${generatedOtp}`)
  console.log(`user otp: ${otp}`)

  if(generatedOtp!=otp){
    res.json({
      msg:"Email verified successfully"
    })
  }else{
    res.json({
      msg:"Incorrect Otp"
    })
  }

 })
 app.listen(3000,()=>{
  console.log("Server running at port 3000")
 });
 
