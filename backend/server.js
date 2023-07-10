const express = require('express');
const dotenv = require('dotenv');
const walls = require('./dummydata/dummydata');
const cors = require("cors");
const connectDB = require('./config/db');
const announcementRoutes = require('./routes/announcementRoutes');

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

app.use(cors({ origin: true, credentials: true }));

app.get('/', (req, res) => {
    res.send('中文病毒安裝成功')
});

app.use('/api/announcement', announcementRoutes);

app.get('/api/walls', (req, res) => {
    res.send(walls);
});

app.get('/api/wall/:id', (req, res) => {
    console.log(req.params.id);
    const singleWall = walls.find((w) => w._id === req.params.id);
    res.send(singleWall);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));