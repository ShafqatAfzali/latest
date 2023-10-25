const express = require("express");
const router=express.Router()
const {data}=require("./CourseTestDT")

//hvis ikke autorisert
router.get("/:id",(req,res)=>{
    const id=req.params.id;
    const kurs=data.find((kurs)=>kurs.courseID==id)
    res.status(200).json(kurs)
})

//hvis autorisert


module.exports = router;