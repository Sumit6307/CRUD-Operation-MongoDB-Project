const express = require("express");
const getconnect = require("./dbconnect");
const { name } = require("ejs");

const app  = express();

app.set("view engine", "ejs");


app.get("/show",async (req,res)=> {

      let collection = await getconnect();
      let records = await collection.find({}).toArray();
             //console.log(records);
    res.render("show", {records});
})

           

app.get("/insert",(req,res)=> {
        res.render("insert");
})



app.get("/insertres", async (req,res)=> {
       let grollno = req.query.grollno;
       let gname = req.query.gname;
       let gcourse = req.query.gcourse;
       let gfees = req.query.gfees;
       /*console.log(grollno); 
       console.log(gname);       
       console.log(gcourse);       
       console.log(gfees);       
*/
       let  collection = await getconnect();
       let r = collection.insertOne ({rollno:grollno, name:gname , course : gcourse , fees: gfees});
       let records = await collection.find({}).toArray();
         res.render("show", {records});

}) 


app.get("/deletedata", async (req,res)=> {
    let grollno = req.query.grollno;
//    console.log(grollno);

       let collection = await getconnect();
       let r =await  collection.deleteOne({rollno: grollno});
       let records = await collection.find({}).toArray();
        res.render("show", {records})
})


app.get("/updatedata", async (req,res)=> {
   let grollno  = req.query.grollno;
   console.log(grollno);

   let collection = await getconnect();
    let rec =  await collection.find({rollno:grollno}).toArray();
    //console.log(rec);
   res.render("update", {rec});

})


app.get("/updateres", async (req,res)=> {
  let grollno = req.query.grollno;
  let gname = req.query.gname;
  let gcourse = req.query.gcourse;
  let gfees = req.query.gfees;
  /*console.log(grollno); 
  console.log(gname);       
  console.log(gcourse);       
  console.log(gfees);       
*/
  let  collection = await getconnect();
  let r = collection.updateOne({rollno:grollno},{$set:{rollno:grollno, name: gname , course : gcourse , fees:gfees}});  let records = await collection.find({}).toArray();
    res.render("show", {records});

}) 


    app.listen(5000,(req,res)=> {
    console.log("Server is running")
})
