import mongoose from 'mongoose'

 export async function ConnectDB() {
     let isConnected = false;
     console.log("MongoDB Connected")
    if(isConnected) return;

   await mongoose.connect('mongodb://localhost:27017/collabspace')
   console.log("MongoDB Connected")
   isConnected = true;

 }

