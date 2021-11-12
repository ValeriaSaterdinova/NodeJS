const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();

const { Schema } = mongoose;

const taskScheme = new Schema({
  text: String,
  isCheck: Boolean
});

const Task = mongoose.model("tasks", taskScheme);

const uri = 'mongodb+srv://ValeriaSaterdinova:restart987*@education.cssf9.mongodb.net/To-doList?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.get('/allTasks', (req, res) => {
  Task.find().then(result => {
    res.send({data: result});
  });
});

app.post('/createTask', (req, res) => {
  if(req.body.hasOwnProperty('text') && req.body.hasOwnProperty('isCheck')){
    const task = new Task(req.body);
    task.save().then(result => {
      res.send('Task created');
    });
  } else {
    res.status(422).send('Incorrect parameters');
  };
});

app.patch('/updateTask', (req, res) => {
  if(req.body.hasOwnProperty('_id') && (req.body.hasOwnProperty('text') || req.body.hasOwnProperty('isCheck'))) {
  Task.updateOne({_id: req.body._id}, req.body).then(result => {
    Task.find({_id: req.body._id}).then(result => {
      res.send({data: result});
    });
  });
  } else {
    res.status(422).send('Incorrect parameters');
  };
});

app.delete('/deleteTask', (req, res) => {
  if(req.query.hasOwnProperty('_id')) {
    Task.deleteOne({_id: req.query._id}).then(result => {
      res.send('Task deleted');
    });
  } else {
    res.status(422).send('Incorrect parameters');
  };
  });


app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});