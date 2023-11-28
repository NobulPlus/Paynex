const express = require('express');
require('dotenv').config();
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send("Server is running Successfully...")
})


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})