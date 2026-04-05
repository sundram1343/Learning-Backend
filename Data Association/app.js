const express=require('express');
const app=express();
const userModel=require('./models/user');
const postModel=require('./models/post');
app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.get('/create',async (req,res)=>{
    let newUser=await userModel.create({
        username:'Harsh',
        age:25,
        email:'xyz@gmail.com'
    })
    res.send(newUser);
})
app.get('/post/create',async (req,res)=>{
    let newPost=await postModel.create({
        postdata:'This is my first post',
        user:'69d273aeba0a01610623863f',
    })
    let user=await userModel.findOne({_id:'69d273aeba0a01610623863f'});
    user.posts.push(newPost._id);
    await user.save();
    res.send({newPost,user});
})
app.listen(3000);