const express=require("express")
const server = express();
const path=require("path");
const cors=require("cors");
const PORT=process.env.PORT || 8000;


server.use(express.static('build'));
server.use(cors());
server.use(express.json());

server.get("/search",(req,res)=>{
    var search_dt=[]
    if(search){
        search_dt=[
            {name:"calculus1"},
            {name:"calculus2"}
        ]
    }
    res.status(200).json(search_dt)
})

server.post("/search",(req,res)=>{
    search = req.body;
    console.log(search)
    res.status(201).json()
})


server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

server.listen(PORT,()=>{console.log(`app listening on port: ${PORT} `)})