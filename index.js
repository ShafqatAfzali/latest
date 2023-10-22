const express=require("express")
const server = express();
const path=require("path");
const cors=require("cors");
const cookie_parse=require("cookie-parser")
const PORT=process.env.PORT || 8000;


server.use(express.static('build'));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(cookie_parse());


server.get("/search",(req,res)=>{

    const search_query=req.query.q;
    //sikkerhets sjekk (sql injection etc)
    
    var search_dt=[];
    if(search_query && search_query!=" " && search_query!="null"){
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


server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

server.listen(PORT,()=>{console.log(`app listening on port: ${PORT} `)})