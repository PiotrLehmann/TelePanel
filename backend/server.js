const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config;

app.get('/', (req, res) => {
    res.send('中文病毒安裝成功')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));