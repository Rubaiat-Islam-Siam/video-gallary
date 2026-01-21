import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI

if(!MONGO_URI) {
    throw new Error("Please define mongo URI in the .env")
}

let cached = global.mongoose

if(!cached){
    cached= global.mongoose = {conn: null , promise: null}
}

export async function connetToDatabase() {
    if(cached.conn) {
        return cached.conn
    }
    
    if(!cached.promise){
        const opt = {
            bufferCommands :true,
            maxPoolSize: 10
        }
        cached.promise = mongoose.connect(MONGO_URI as string, opt).then(()=> mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }
}