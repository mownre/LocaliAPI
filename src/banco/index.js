
const mysqlServer = require('mysql');
const connection = mysqlServer.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'locali'
});

const errorHandler = (error, msg, rejectFunction) => {
    console.error(error);
    rejectFunction({error: msg})
}

const markerModule = require('./markers')({connection, errorHandler});


module.exports = {
    markers: () => markerModule
};