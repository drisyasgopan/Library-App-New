const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require ('jsonwebtoken');
const Userdata  = require('./src/model/userData');
const Bookdata = require('./src/model/bookData');
const app = new express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

username="admin";
email="admin@gmail.com";
password="12345";

app.post('/insert',verifyToken, function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");

    var user = {
        username : req.body.item.username,
        emailId : req.body.item.emailId,
        password : req.body.item.password
    }

    var User = new Userdata(user);
    User.save();
})

function verifyToken(req,res){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split('')[1]
    if(token=='null')
    {
        return res.status(401).send('Unauthorized Request')
    }
    let payload = jwt.verify(token,'secretKey')
    console.log(payload)
    if(!payload)
    {
        return res.status(401).send('Unauthorized Request')
        req.userId = payload.subject
        next()
    }
}

app.post('/login',(req,res)=>{
    // let userData = req.body;
    // console.log("email== :" +userData.email+"  password== :"+userData.password);
    Userdata.findOne({email: req.body.item.email} && {password : req.body.item.password}).then(
        (user) => {
            if (!user){
                res.status(401).send('Invalid Username')
            }
            else{
                let payload = {subject: username+password}
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }) 
            
    // if(!email){
    //     res.status(401).send('Invalid Email')
    // } else if
    //   (password !== userData.password){
    //     res.status(401).send('Invalid Password')
    // } else {
    //     res.status(200).send()
    // } 
})



app.get('/books',function (req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    Bookdata.find()
    .then(function(books){
         res.send(books);
    })
})

app.post('/insertBook', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
    
    var book = {
        imageUrl:req.body.item.imageUrl,
        title:req.body.item.title,
        author:req.body.item.author,
        about:req.body.item.about

    }

    var books = new Bookdata(book);
    books.save();

})

app.get('/:id', (req,res)=>{
    const id = req.params.id;
    Bookdata.findByIdAndDelete({"_id":id})
    .findOne({"_id":id})
    .then((book)=>{
        // console.log(book);
        res.send(book);
    })
})

app.put('/updateBook',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");

    id=req.body._id,
    imageUrl = req.body.imageUrl
    title = req.body.title,
    author = req.body.author,
    about = req.body.about
    Bookdata.findByIdAndUpdate({"_id":id},
    {$set:{
        "imageUrl":imageUrl,
        "title":title,
        "author":author,
        "about":about
    }})
    .then(function(){
        res.send();
    })
})

app.delete('/remove/:id',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");

    id = req.params.id;
    Bookdata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('Success')
        res.send();
    })
})

app.listen(3000,()=>{
    console.log("server listening port 3000");
});