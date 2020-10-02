const  express = require('express')
const app = express()
var bodyParser = require("body-parser");//use for get data from form
const port = 5050
app.use(bodyParser.urlencoded({extended: true}));//use for get data from form
app.set("view engine","ejs");//we dont have to apply ".ejs" 

//database
let StudentList =[
    {
        name : " Mandeep Jain",
        rollNo : 41,
        marks : 35
    },
    {
        name : "Malay Bakshi",
        rollNo : 52,
        marks : 34
    },
    {
        name : "Malav Jain",
        rollNo: 38,
        marks : 37
    }
]

app.get("/", (req,res) => {
    //studentList ={name : "mandeep"}
    res.render("student", {students : StudentList})
  // res.send("Hello")
})

app.post("/", (req,res) => {
    console.log(req.body)
   
    StudentList.push(req.body)
    res.render("student", {students : StudentList}) 
})

app.listen(port, (req,res) =>{

    console.log("Server started on "+port )
} )