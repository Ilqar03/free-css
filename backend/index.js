const express = require('express')
const { default: mongoose } = require('mongoose')
const cors = require('cors')
const app = express()
const port = 3000
require('dotenv').config()

app.use(cors())
app.use(express.json())

const cardSchema = new mongoose.Schema({
    name: String
});

const Card = mongoose.model('CardSchema', cardSchema);

app.get('/', (req, res) => {
    Card.find({}, (err, docs) => {
        if (!err) {
            res.send(docs)
        } 
        else {
            res.send("alinmadi")
        }
    });
})

app.get('/:id',(req,res)=>{
    const {id}=req.params
    Card.findById(id,(err,doc)=>{
        if (!err) {
            res.send(doc)
        } else {
            res.send({message:"id gore get alinmadi"})
        }
    })
})

app.post('/',(req,res)=>{
    const newcard = new Card({
        name: req.body.name,
    });
    newcard.save()
    res.send("Success")
})

app.delete('/:id',(req,res)=>{
    const {id}=req.params
    Card.findByIdAndDelete(id,(err,docs)=>{
        if (!err) {
            res.send(docs)
        } else {
            res.send({message:"id gore delete alinmadi"})
        }
    })
})

mongoose.set('strictQuery', true);

mongoose.connect(process.env.UP)
    .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})