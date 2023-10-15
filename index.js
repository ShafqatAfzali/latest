const express=require("express")
const server = express();
const path=require("path");
const PORT=process.env.PORT || 8000;


server.use(express.static('build'));

server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

server.listen(PORT,()=>{console.log(`app listening on port: ${PORT} `)})