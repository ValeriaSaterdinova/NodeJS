const Task = require('../../db/models/task/index');

module.exports.getAllTasks = (req, res) => {
  Task.find().then(result => {
    res.send({ data: result });
  }).catch(err => {
    res.status(422).send('Incorrect parameters');
  });
};

module.exports.createNewTask = (req, res) => {
  if (req.body.hasOwnProperty('text') && req.body.hasOwnProperty('isCheck')){
    const task = new Task(req.body);
    task.save().then(result => {
      res.send({ data: result });
    }).catch(err => {
      res.status(422).send('Incorrect parameters');
    });
  } else {
    res.status(422).send('Incorrect parameters');
  };
};

module.exports.changeTaskInfo = (req, res) => {
  if (req.body.hasOwnProperty('_id') && (req.body.hasOwnProperty('text') || req.body.hasOwnProperty('isCheck'))) {
    Task.updateOne({_id: req.body._id}, req.body).then(result => {
      Task.find({_id: req.body._id}).then(result => {
        res.send({data: result});
      }).catch(err => {
        res.status(422).send('Incorrect parameters');
      });
    });
  } else {
    res.status(422).send('Incorrect parameters');
  };
};

module.exports.deleteTask = (req, res) => {
  if (req.query.hasOwnProperty('_id')) {
    Task.deleteOne({_id: req.query._id}).then(result => {
      res.send('Task deleted');
    }).catch(err => {
      res.status(422).send('Incorrect parameters');
    });
  } else {
    res.status(422).send('Incorrect parameters');
  };
};