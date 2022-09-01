const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.status(400).send('Random user api is running');
})

app.listen(PORT, () => {
    console.log('Server Is Running on port', PORT);
})