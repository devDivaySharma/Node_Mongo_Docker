const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var os = require('os');

const app = express();

var ip = '';

var networkInterfaces = os.networkInterfaces( );
if(networkInterfaces && networkInterfaces['eth0'] != null && networkInterfaces['eth0']['address'] != null)
{
    ip = networkInterfaces['eth0']['address'];
}else if(networkInterfaces && networkInterfaces['lo'] != null && networkInterfaces['lo']['address'] != null)
{
    ip = networkInterfaces['lo']['address'];
}else {
    ip = '127.0.0.1';
}


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const config = {
    name: 'sample-express-app',
    port: 3000,
    host: '0.0.0.0',
};

app.get('/todo', (req, res) => {
    ToDo.find()
      .then((toDos) => res.status(200).send(toDos))
      .catch((err) => res.status(400).send(err));
});


app.post('/todo', (req, res) => {
    const body = req.body;
    console.log('body',req.body);
    const toDo = new ToDo({
      text: body.text,
    });
    console.log('todo',toDo);
    toDo.save(toDo)
      .then((savedToDo) => res.status(201).send(savedToDo))
      .catch((err) => res.status(400).send(err));
  });

app.get('/', (req, res) => {
    let a = [
        {
            "name":"divay"
        },
        {
            "name":"divay"
        },
        {
            "name":"divay"
        },
        {
            "name":"divay"
        }
    ]
    res.status(200).send(a);
});

const mongoose = require('mongoose');
const ToDo = require('./toDoModel.js').ToDo;
const DB_URI = 'mongodb://mongo:27018/toDoApp';

mongoose.connect(DB_URI).then((v) =>{
    app.listen(config.port, config.host, (e)=> {
        if(e) {
            throw new Error('Internal Server Error');
        }
        console.log(`${config.name} running on ${config.host}:${config.port}`);
    });
}).catch(e =>{
    console.log('err',e);
});