const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  // axios.get(`${API}/posts`)
  //   .then(posts => {
  //     res.status(200).json(posts.data);
  //   })
  //   .catch(error => {
  //     res.status(500).send(error)
  //   });
    MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
     if (err) res.status(500).send(err);

      db.collection('quotes').find().toArray(function (err, result) {
        if (err) res.status(500).send(err);

        res.status(200).json(result);
      })
    })
});

module.exports = router;