const express = require("express");
const router=express.Router()

router.get("/",(req,res)=>{

    const search_query=req.query.q;
    //sikkerhets sjekk (sql injection etc)
    //lagre data i analyse database
    //importer data fra app database (kurs tabell)
    console.log(req.query)
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

module.exports = router;