// before db
/* module.exports = function(app, db) {
  app.post('/notes', (req, res) => {
    console.log(req.body)
    res.send('hello')
  });
}; */

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    if (req.body.body == null || req.body.title == null) {
      res.send({'error':'An error has occurred'});
      return;
    }

    const note = { text: req.body.body, title: req.body.title };

    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(note);
      }
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    });
  });

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
