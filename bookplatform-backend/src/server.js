const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const { fromEnv } = require('./utils')
const connection = require('./config/db')
const userRoute  = require('./routes/user-route')
const exchangeRoute = require('./routes/exchange-route')
const bookRoute = require('./routes/book-route')
const app = express()

const PORT = fromEnv('APP_PORT') || 3000;

connection()

app.use(express.json());

app.use(cors());

app.use('/api/v1/users',userRoute)
app.use('/api/v1/books',bookRoute)
app.use('/api/v1/exchange',exchangeRoute)

app.use((req, res, next) => {
    logger.info({
        method: req.method,
        url: req.url,
        headers: req.headers,
    });
    next();
});


app.get("/ping", (req, res) => {
  res.status(200).json({ message:' Working!' })
});



app.listen(PORT, () => {
    logger.info(`🚀 Server is running on port ${PORT}`);
});
