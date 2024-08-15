const express = require ("express")

const app = express();

app.get("/" , (req , res) => {
    res.send("This is Home route")
})

app.get("/about" , (req , res) => {
    res.send("This is About route" + "HEY I am " + req.query.name)
})

const PORT = 8000;

app.listen (PORT , () => {
    console.log (`Server is Working on PORT ${PORT}`)
})

/*
app.METHOD(PATH , HANDLER FUNCTION)
*/