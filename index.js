require('dotenv').config();
const server = require('./src/server');
const connect = require('./src/lib/db');

const PORT = process.env.PORT || 8080;

connect().then(() => {
    console.log(`DB Connected`)
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}).catch((err) => {
    console.error(err)
});