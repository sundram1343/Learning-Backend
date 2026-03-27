const moongoose=require('mongoose');
moongoose.connect('mongodb://127.0.0.1:27017/testapp1');
const userSchema=moongoose.Schema({
    image:String,
    email:String,
    name:String
})
module.exports=moongoose.model('user',userSchema);