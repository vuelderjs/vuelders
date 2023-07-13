import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const mongoConnect = async function(){

    if(!process.env.MONGO_URI){
        console.error("MongoDB connection error: process.env.MONGO_URI not found")
        throw new Error("process.env.MONGO_URI not found")
    }

    try{
        await connectToMongo(process.env.MONGO_URI)
        const db = mongoose.connection;

        db.on('error', function (){
            console.error.bind(console, 'connection error:')
            console.log("Reconnecting with MongoDB")
            setTimeout(async () => await connectToMongo(process.env.MONGO_URI), 3000)
        });

        db.once('open', function() {
            console.log("MongoDB Open")
        });

        const {ObjectId} = mongoose.Types;
        ObjectId.prototype.valueOf = function () {
            return this.toString();
        };
        return true
    }
    catch (error){
        console.error("Connection to Mongo error: "+error)
        throw new Error("Connection to Mongo error: "+error)
    }


}

export const connectToMongo = function (mongoUri){

    return new Promise((resolve, reject) => {

        mongoose.Promise = global.Promise;

        mongoose.connect(mongoUri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log("Mongoose connected")
                resolve()
            })
            .catch(error => {
                console.error("Mongoose not connected", error)
                reject(error)
            });

    })

}

export const mongoDisconnect = async () => {
    if(mongoose.connection.readyState === 0) throw new Error('I cant disconnect if havent conection in mongoose')
    await mongoose.disconnect()
}