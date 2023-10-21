const express=require("express")
const server = express();
const path=require("path");
const cors=require("cors");
const cookie_parse=require("cookie-parser")
const PORT=process.env.PORT || 8000;


server.use(express.static('build'));
server.use(cors());
server.use(express.json());
server.use(cookie_parse());

server.get("/search",(req,res)=>{
    var search_dt=[];
    const search=req.cookies["search"];
    if(search){
        search_dt=[
            {name:"calculus1"},
            {name:"calculus2"},
            {name:"quantum field theory"},
            {name:"vector calculus"},
            {name:"biochemistry"},
            {name:"physical chemistry"},
            {name:"neural networks in javascript"},
            {name:"statistical mechanics"},
            {name:"physiology 101"},
        ]
    }

    res.status(200).json(search_dt)
})

server.post("/search",(req,res)=>{
    res.cookie("search", JSON.stringify(req.body.search),{
        maxAge:(5*60*1000),
        httpOnly: true,
        path:"/",
        sameSite:"strict",
        secure:false
    })
    res.status(201).json()
})


server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

server.listen(PORT,()=>{console.log(`app listening on port: ${PORT} `)})