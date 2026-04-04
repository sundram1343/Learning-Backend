const moongoose = require('mongoose');
moongoose.connect('mongodb://127.0.0.1:27017/auth');
const userSchema=new moongoose.Schema({
    username:String,
    password:String,
    age:Number,
    email:String
});
module.exports=moongoose.model('User',userSchema);