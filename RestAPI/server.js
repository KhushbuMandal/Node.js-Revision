const express = require ("express");
const app = express();
const fs = require("fs")
const users = require("./MOCK_DATA.json")


app.use (express.json());
app.use (express.urlencoded({extended : false}))
app.use (express.static("public"))

const PORT = 5000;

//Routes
app.get('/' , (req , res) => {
     res.send("This is our Home Route");
})

app.get("/users" , (req , res) => {
    res.json(users)
})


//Nested Routing
app.route("/users")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id)
        res.json(user);
    })
    .post ((req, res) => {
        const body = req.body;
        users.push({...body , id : users.length+1});
        fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users) , (err , data) => {
            res.json({status : "Sucessfull"})
        })
    })
    .patch(() => {

    })
    .delete(() => {

    })


app.listen(PORT , () => {
    console.log (`Server is working at ${PORT}`)
})