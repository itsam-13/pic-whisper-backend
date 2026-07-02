const mongoose = require('mongoose')
const dns = require('dns');


dns.setServers(
    ['8.8.8.8',
        '1.1.1.1']
)

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('Connected to DB')
        })
        .catch((err)=>{
            console.log(err);
            
        })
}

module.exports = connectDB