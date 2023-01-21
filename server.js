const express = require('express');
const userRoutes = require('./src/user/routes');

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
