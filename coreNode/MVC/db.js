const mongoose=require('mongoose');
require('dotenv').config
async function connectMongodb(url){
    return mongoose.connect(url)
}

module.exports = {
    connectMongodb,
}