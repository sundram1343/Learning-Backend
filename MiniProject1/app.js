const express = require('express');
const app = express();
const userModel=require('./models/user');
const postModel=require('./models/post')
const cookieParser = require('cookie-parser');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/profile',isLoggedIn,async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate('posts');
    res.render('profile',{user})
})
app.post('/post',isLoggedIn,async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email})
    let {content}=req.body;
    let post=await postModel.create({
        user:user._id,
        content
    })
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
})
app.post('/register',async (req,res)=>{
    let{email,password,username,name,age}=req.body;
    let user= await userModel.findOne({email})
    if(user) return res.status(500).send("User already Registered");

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let newUser= await userModel.create({
                username,
                email,
                age,
                name,
                password:hash
            });
           let token= jwt.sign({email:email,userid:newUser._id},'Shhhh');
           res.cookie('token',token);
           res.redirect('/login');
        })
    })

})
app.post('/login',async (req,res)=>{
    let{email,password}=req.body;
    let user= await userModel.findOne({email})
    if(!user) return res.status(5000).send("Something Went Wrong");
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result) {
            let token= jwt.sign({email:email,userid:user._id},'Shhhh');
           res.cookie('token',token);
            res.status(200).redirect('/profile');
            
        }
        else res.redirect('/login')
    })

})
app.get('/logout',(req,res)=>{
    res.cookie('token','');
    res.redirect('login')
})
function isLoggedIn(req,res,next){
    if(!req.cookies.token)res.redirect('/login');
    else{
        let data=jwt.verify(req.cookies.token,'Shhhh');
        req.user=data
    }
    next();
}
app.listen(3000);