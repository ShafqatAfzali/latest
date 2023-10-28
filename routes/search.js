const express = require("express");
const router=express.Router()
const {data}=require("./CourseTestDT")

router.get("/",(req,res)=>{

    const page=req.query.p;
    const search_query=req.query.q;
    //sikkerhets sjekk (sql injection etc)
    //lagre data i analyse database
    //importer data fra app database (kurs tabell)

    var result_dt=[];
    var finns=false;
    if(search_query && search_query!=" " && search_query!="null"){
        //dette skal skje i mySQL select statement
        data.forEach((kurs)=>{
            if(kurs.name.includes(search_query)){
                finns=true;
                result_dt.push(kurs)
            }
        })

        if(finns){
            return res.status(200).json(result_dt)
        } else{
            //dette skal fjernes når antall kurs øker
            return res.status(200).json(data)
        }
    }

    res.status(200).json([])
})

module.exports = router;