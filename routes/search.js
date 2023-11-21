const express = require("express");
const router=express.Router()
const {data}=require("./CourseTestDT");


router.get("/",(req,res)=>{

    const page=Number(req.query.p);
    const search_query=req.query.q;
    const topic=req.query.topic;
    const sort=req.query.sort;
    const lowest_price=Number(req.query.low_P);
    const highest_price=Number(req.query.high_P);
    const lowest_rating=Number(req.query.low_R);
    const highest_rating=Number(req.query.high_R);
    //********viktig
    //********viktig
    //husk sql injection prevensjon her
    //********viktig
    //********viktig

    //lagre data i analyse database

    if(search_query && search_query!=" " && search_query!="null"){
        //importer data fra app database (kurs tabell)
        //alt dette skal skrives på nytt og mySQL select statement skal brukes for å optimalisering

        //eksempel SELECT * From kursdata WHERE kurs_navn LIKE %search_query%
        var result_dt=data.filter((kurs)=> kurs.name.includes(search_query))

        if(result_dt.length>0){
            const upper_antall=16*page;
            const lower_antall=16*(page-1);

            if(!isNaN(lowest_price) & !isNaN(highest_price) & lowest_price<highest_price){
                result_dt=result_dt.filter((kurs)=>kurs.price>=lowest_price & kurs.price<=highest_price)
            }

            if(!isNaN(lowest_rating) & !isNaN(highest_rating)){
                result_dt=result_dt.filter((kurs)=>kurs.rating>=lowest_rating & kurs.rating<=highest_rating)
            }

            if(sort!=="sort by" & sort!=="null"){
                switch(sort){
                    case "lowest price":
                        result_dt=result_dt.sort((kurs_en,kurs_to)=>kurs_en.price-kurs_to.price);
                        break
        
                    case "highest price":
                        result_dt=result_dt.sort((kurs_en,kurs_to)=>kurs_to.price-kurs_en.price);
                        break
                    case "highest rating":
                        result_dt=result_dt.sort((kurs_en,kurs_to)=>kurs_to.rating-kurs_en.rating);
                        break
                    
                } 
            }

            if(topic!=="Topic" & topic!=="null"){
                result_dt=result_dt.filter((kurs)=>kurs.topic===topic);
            }

            /*if(topic!=="sort by" || topic!== null){
                result_dt=result_dt.filter((kurs)=>kurs.topic===topic)
            }*/

            const antall_page=Math.ceil(result_dt.length/16);

            return res.status(200).json({data:(result_dt.slice(lower_antall,upper_antall)), antall_page:antall_page})
        } else if(search_query==="cvhdf6vhb24n2jj"){
            //dette skal fjernes når antall kurs øker
            const upper_antall=16*page;
            const lower_antall=16*(page-1);
            const antall_page=Math.ceil(data.length/16);
            
            return res.status(200).json({data:(data.slice(lower_antall,upper_antall)), antall_page:antall_page})
        } else {
            return res.status(200).json({data:[], antall_page:1})
        }
    }
})

module.exports = router;

