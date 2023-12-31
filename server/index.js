require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const docRoutes = require('./routes/docs');
const { Doc } = require("./models/doc");

connection();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/docs', docRoutes);


const port=process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));


app.get('/getfileNames', async (req, res) => {
    console.log("get fileNames");
    try {
        const fileNames = await Doc.find({});
        res.send(fileNames);
    } catch (error) {
        console.log(error);
    }
})