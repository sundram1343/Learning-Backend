const express=require('express');
const app=express();
const userModel=require('./usermodel')
app.get('/',(req,res)=>{
    res.send("Hey");
})
app.get('/create',async (req,res)=>{
    let createuser= await userModel.create({
        name:'harsh',
        email:'harsh@gmail.com',
        username:'harsh'
    })
    res.send(createuser);
})
app.get('/update',async (req,res)=>{
    let updateduser=await userModel.findOneAndUpdate({username:'harsh'},{name:'Sundram'},{returnDocument:'after'});
    res.send(updateduser);
})
app.get('/read',async (req,res)=>{
    let users=await userModel.find();
    res.send(users);
})
app.listen(3000)