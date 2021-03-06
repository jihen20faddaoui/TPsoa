const express =require('express')
const {MongoClient,ObjectID}=require('mongodb')
const bodyParser =require ('body-parser')
const assert=require('assert')
const cors=require('cors')

const app= express()

app.use(bodyParser.json())
app.use(cors())


const mongo_url='mongodb://localhost:27017'
const dataBase='DBContact'


MongoClient.connect(mongo_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    },(err,client)=>{
        assert.equal(err,null,'DB connection failed')
        const db = client.db(dataBase)

        app.get('/contact',(req,res)=>{  
            db.collection('contact').find().toArray((err,data)=>{
            if(err)
            res.send('Cannot fetch contact')
            else
            res.send(data)
            })
            })
//**************************************************************** get findone by id */
            app.get('/contact/:id',(req,res)=>{
                db.collection('contact').findOne(
                    {_id:ObjectID(req.params.id)},
                (err,data)=>{
                if(err)
                res.send('Cannot find contact')
                else
                res.send(data)
                })
                })
//***************************************************************** post :add new contact */    
app.post('/new_contact/',(req,res)=>{
    let newContact=req.body
    db.collection('contact').insertOne(newContact ,
        
    (err,data)=>{
    if(err)
    res.send('Cannot add new contact')
    else
    res.send('contact added')
    })
    })

    //*********************************************************** put :modify contact */
    app.put('/modify_contact/:id',(req,res)=>{
        db.collection('contact').findOneAndUpdate(
            {_id:ObjectID(req.params.id)},
            {$set:{...req.body}},
        (err,data)=>{
        if(err)
        res.send('Cannot update contact')
        else
        res.send('contact updated')
        })
        })

        app.delete('/delete_contact/:id',(req,res)=>{
            db.collection('contact').findOneAndDelete(
                {_id:ObjectID(req.params.id)},
                {$set:{...req.body}},
            (err,data)=>{
            if(err)
            res.send('Cannot delete contact')
            else
            res.send('contact deleted')
            })
            })



})         

                


app.listen(3000,(err)=>{
    if(err){
        console.log('error while running server')
    } else {
        console.log('server is running on port 3000')
    }
})