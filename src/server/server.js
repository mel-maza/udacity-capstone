const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

// TODO: Hier evtl. Apis aufsetzen

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.listen(3000, () => {
    console.log('server is up - listening on port 3000');
})

// Routes
app.get('/', (req, res) => {res.sendFile('dist/index.html');})
