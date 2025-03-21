import express from 'express';
const app=express();
app.use(express.json());
import moongose from 'mongoose';
// const moongose=require('moongose');
moongose.connect('mongodb+srv://mongodb-crud:mongodb-crud@cluster0.d8miu.mongodb.net/databasecrud?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('db connected')
})
.catch((e)=>{
    console.log(`error:${e}`)
})
let schema2=moongose.Schema({
    Name:{
        type:String,
        requried:true
    },
    Emailid:{
        type:String,
        requried:true
    },
    Phoneno:{
        type:Number,
        requried:true
    },
    Password:{
        type:String,
        requried:true
    },
    Age:{
        type:Number,
        requried:true
    }

})
let model2=moongose.model('crud',schema2)

app.post('/addingdata',async(req,res)=>{
    let obj=new model2({
        Name:req.body.Name,
        Emailid:req.body.Emailid,
        Phoneno:req.body.Phoneno,
        Password:req.body.Password,
        Age:req.body.Age
    })
    console.log(req.body)
    obj.save();
    // let doc1=await model2.Save();
    res.send('data added')
})

app.get('/',async(req,res)=>{
    let data=await model2.find({});
    res.send(data);

    
})
app.delete('/deletedata',async(req,res)=>{
    const user=await model2.findByIdAndDelete(req.body.id)
    console.log(user);
    res.send('doc deleted sucessfully')
})

app.patch('/updatedata',async(req,res)=>{
    const user1=await model2.findByIdAndUpdate(req.body.id,{Phoneno:req.body.Phoneno})
    console.log(user1);
    res.send('doc updated sucessfully')
})





app.listen(4007,()=>{
    console.log("server started")
})

