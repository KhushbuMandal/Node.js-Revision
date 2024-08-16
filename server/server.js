require('dotenv').config();
const express = require ("express");
const app = express();
const userRouter = require ("./routes/user.routes");
const { connectMongoDB } = require("./connection");

const PORT = 3000;

// app.get ("/" , (req , res) => {
//     res.send ("This is the Home route and Working Properly");
// })

//Connection
connectMongoDB(process.env.MONGODB_URL);

app.use(express.urlencoded({extended : true}));
app.use (express.json());

//Routes
app.use("/user" , userRouter);


app.listen(PORT , () => {
    console.log (`Server is started at ${PORT}`)
})