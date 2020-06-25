const axios = require('axios');
const express = require('express');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3001;

app.use(cors({origin:'*'}))

app.listen(port,() => console.log('API Server started.'))

app.get('/wallet/:address', (req,res) => {
  axios.get(`https://blockchain.info/multiaddr?active=${req.params.address}`)
    .then((result) => {
      //console.log(result.data);
      res.json(result.data);
    }).catch((e) => {
      console.log(e.message);
    })
});