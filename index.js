const  express = require('express')
const app = express()
var bodyParser = require("body-parser");//use for get data from form
const port = 5050
const Multer = require("multer")//upload file 
const path = require("path")

app.use(bodyParser.urlencoded({extended: true}));//use for get data from form
app.set("view engine","ejs");//we dont have to apply ".ejs" 
app.use( express.static( "public" ) );

const storage = Multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './public/images' )
    },
    filename : function(req, file, cb){
        cb(null, file.originalname + '.png' );
    }}
);

const upload = Multer({storage : storage})

//database
let StudentList =[
    {
        name : " Mandeep Jain",
        rollNo : 41,
        marks : 35,
        image : '../images/image-1601877815424.png'
    },
    {
        name : "Malay Bakshi",
        rollNo : 52,
        marks : 34,
        image : '../images/image-1601877832224.png'
    },
    {
        name : "Malav Jain",
        rollNo: 38,
        marks : 37,
        image : '../images/image-1601877847795.png'
    }
]

app.get("/", (req,res) =>{
    res.redirect("/login")
})

app.get("/login", (req,res) => {

    res.render("login")

})

app.post("/login", (req,res) => {

    let user = "Mandeep"
    let pass = "1234"
   //console.log(typeof(req.body.Password))

    if(req.body.Username == user){
        
        if(req.body.Password == pass) {
            console.log("got")
          res.redirect("/studentDetails")
        }
        else{
            console.log("notgot")
            res.redirect("/login")
        }
    }
    else{
        console.log("notgot")
       res.redirect("/login")
     }
 })


app.get("/studentDetails",(req,res) => {
    //studentList ={name : "mandeep"}
    res.render("student", {students : StudentList})
  // res.send("Hello")
})

app.post("/studentDetails", upload.single("image"), (req,res) => {
   // console.log(req.body)

   let nameobj = { 
    name : req.body.name,
    rollNo : req.body.rollNo,
    marks : req.body.marks,
   image : '../images/' + req.file.originalname  + '.png'

   }
    //res.send("gotit")
   
    StudentList.push(nameobj) //database me push krege 
    res.render("student", {students : StudentList}) //again vo page render karega 
})



app.listen(port, (req,res) =>{

    console.log("Server started on "+port )
} )

