require('dotenv').config()
const express = require ("express");
const app = express();
const fs = require("fs")
const mongoose = require ("mongoose");
const users = require("./MOCK_DATA.json")


app.use (express.json());
app.use (express.urlencoded({extended : false}))
app.use (express.static("public"))

const PORT = 5000;

//Schema
const userSchema  = new mongoose.Schema ({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    jobTitle : {
        type : String,
    },
    gender : {
        type : String,
       
    }

} , {timestamps : true})

// Connection
mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error" , err) );

//Model
const User = mongoose.model("User" , userSchema);




//Routes
app.get('/' , (req , res) => {
     res.send("This is our Home Route");
})

app.get("/users" ,async (req , res) => {
    // res.setHeader("MyName" , "Khushbu")
    // console.log(req.headers);
    // res.json(users)
    const all = await User.find({});
    res.status(200).json(all);
})


//Nested Routing
app.route("/users/:id")
    .get( async (req, res) => {
        // const id = Number(req.params.id);
        const id = await User.findById(req.params.id);
        // const user = users.find((user) => user.id === id)
        
        res.json(id);
    })
    .post (async (req, res) => {
        const body = req.body;
        if (
            !body ||
            !body.first_name ||
            !body.last_name ||
            !body.email ||
            !body.gender ||
            !body.job_title
        ) {
            return res.status(400).json({msg : "All fields are required..."})
        }

        const result = await User.create({
            firstName : body.first_name,
            lastName : body.last_name,
            email : body.email,
            gender : body.gender,
            jobTitle : body.job_title
        });

        console.log("result" , result)

        return res.status(201).json({msg : "success"});

    })
    .patch( async (req , res) => {

        const user = await User.findByIdAndUpdate(req.params.id , {lastName : "Choudary"})
        res.json(user);

    })
    .delete( async (req , res) => {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json(user)
    })


app.listen(PORT , () => {
    console.log (`Server is working at ${PORT}`)
})