var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var router=require('./router/route');
var cors=require('cors')
app.use(cors());
const PORT=process.env.PORT||5000
app.use(express.json());
app.use('/api',router);
app.listen(PORT,(err)=>{
    if(err)console.log(err);
    else{
        console.log("server running");
    }
})