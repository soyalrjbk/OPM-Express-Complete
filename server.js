//It reads the .env file containing MONGO_URL first that has my username & password for MongoDB Atlas. 
require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient, ObjectId } = require('mongodb')

var db, collection;

const url = process.env.MONGO_URL;
const dbName = "opm";

const monsterList =[
  {name: "Monster Girl", level: "Tiger"},
  {name: "Boros", level: "Dragon"},
  {name: "Carnage Kabuto", level: "Demon"},
  {name: "Vaccine Man", level: "Demon"},
  {name: "Frog Man", level: "Wolf"}
]
//Render assigns PORT automatically, so 9000 is a fallback for local development.
  const PORT = process.env.PORT || 9000;
  app.listen(PORT, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, heroes) => {
    if (err) return console.log(err)
  db.collection('threats').find().toArray((err, threats) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: heroes, threats: threats})
  })
})
})

//Register a hero
app.post('/messages', (req, res) => {
  db.collection('messages').insertOne({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return console.log(err)
    console.log('Hero info saved to database')
    res.redirect('/')
  })
})

//Scan for random threats
app.post('/threats', (req, res) => {
  const monster=monsterList[Math.floor(Math.random()*monsterList.length)]
  db.collection('threats').insertOne({name: monster.name, level: monster.level, status: "active", outcome: " "}, (err, result) => {
    if (err) return console.log(err)
    console.log('Random monster info saved in the database')
    res.redirect('/')
  })
})

//Dispatch a hero to a threat
   app.post('/threats/:id/dispatch', (req, res) => {
    //50/50 chance of winning/losing
     const won = Math.random() < 0.5

     let outcome
     let status

     if (won) {
       outcome = req.body.heroName + " defeated the monster!"
       status = 'defeated'
     } else {
       outcome = req.body.heroName + " retreated. The monster is still out there!"
       status = 'active'
     }

        db.collection('threats').updateOne(
       { _id: new ObjectId(req.params.id) },
       { $set: { status: status, outcome: outcome } },
       (err, result) => {
         if (err) return console.log(err)

         // Hero lost: no points, just reload
         if (!won) return res.redirect('/')

         // Hero won: give them 1 point
         db.collection('messages').updateOne(
           { name: req.body.heroName },
           { $inc: { thumbUp: 1 } },
           (err, result) => {
             if (err) return console.log(err)
             res.redirect('/')
           }
         )
       }
     )
   })

//Retire
app.delete('/retire', (req, res) => {
  db.collection('messages').findOneAndDelete(
    {_id: new ObjectId(req.body.id)},
    (err, result) => {
      if (err) return res.status(500).send(err)
        res.json("Hero Retired!")
  })
})
