const express = require('express');
const dotenv = require('dotenv');
const dummy = require('./dummydata/dummydata');
const cors = require("cors");
const connectDB = require('./config/db');

const app = express();
dotenv.config();
connectDB();

app.use(cors({ origin: true, credentials: true }));

app.get('/', (req, res) => {
    res.send('中文病毒安裝成功')
});

app.get('/api/dummy', (req, res) => {
    res.send(dummy);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));