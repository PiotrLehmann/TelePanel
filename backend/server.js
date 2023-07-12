const express = require('express');
const dotenv = require('dotenv');
const walls = require('./dummydata/dummydata');
const cors = require("cors");
const connectDB = require('./config/db');
const announcementRoutes = require('./routes/announcementRoutes');
const userRoutes = require('./routes/userRoutes');
const wallRoutes = require('./routes/wallRoutes');
const calendarRoutes = require('./routes/calendarEventRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

app.use(cors({ origin: true, credentials: true }));

app.get('/', (req, res) => {
    res.send('中文病毒安裝成功')
});

app.use('/api/user', userRoutes);
app.use('/api/wall', wallRoutes);
app.use('/api/announcement', announcementRoutes);
app.use('/api/calendar', calendarRoutes)

app.use(notFound);
app.use(errorHandler);

app.use('/api/announcement', announcementRoutes);

app.get('/api/walls', (req, res) => {
    res.send(walls);
});

app.get('/api/wall/:id', (req, res) => {
    const singleWall = walls.find((w) => w._id === req.params.id);
    res.send(singleWall);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));