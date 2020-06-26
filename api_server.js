const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Made caps since it's a constant

app.use(cors()); // { origin: '*' } is a default

app.listen(PORT, () => console.log(`API Server started on port ${PORT}`)); // Added port for helpfulness if you more apps later

// Swapped to Async/Await
app.get('/wallet/:address', async (req, res) => {
  try {
    const { params } = req;
    const { data } = await axios.get(`https://blockchain.info/multiaddr?active=${params.address}`);
    return res.json(data);
  } catch (error) {
    // I don't know 100% how error would come through here so you may have to tweak this section
    console.log(error.message);
    return res.json({ error: true, message: error.response.data });
  }
});
