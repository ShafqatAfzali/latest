const express=require("express")
const server = express();
const path=require("path");
const cors=require("cors");
const cookie_parse=require("cookie-parser")
const PORT=process.env.PORT || 8000;

const search=require("./routes/search")


server.use(express.static('build'));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(cookie_parse());


server.use("/search",search)


server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

server.listen(PORT,()=>{console.log(`app listening on port: ${PORT} `)})