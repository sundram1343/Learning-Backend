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
app.post('/register',async (req,res)=>{
    let{email,password,username,name,age}=req.body;
    let user= await userModel.findOne({email})
    if(user) return res.status(5000).send("User already Registered");

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let newUser= await userModel.create({
                username,
                email,
                age,
                name,
                password:hash
            });
           let token= jwt.sign({email:email,userid:user._id},'Shhhh');
           res.cookie(token);
           res.send('registered');
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
           res.cookie(token);
            res.status(200).send('You can Login');
            
        }
        else res.redirect('/login')
    })

})
app.get('/logout',(req,res)=>{
    res.cookie('token','');
    res.redirect('login')
})
function isLoggedIn(req,res,nex){
    if(req.cookies.token==='')res.send('You Must Be logged In');
    else{
        let user=jwt.verify(req.cookies.token,'Shhhh');
        req.user=data
    }
    next();
}
app.listen(3000);