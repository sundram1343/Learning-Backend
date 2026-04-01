const express =require('express');
const app =express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
   let token=jwt.sign({email:'test@gmail.com'},'secret')
    res.cookie('token',token);
    res.send('done');
})
app.get('/read',(req,res)=>{
    jwt.verify(req.cookies.token,'secret')
})
app.listen(3000);