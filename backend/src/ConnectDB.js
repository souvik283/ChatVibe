import mongoose from "mongoose";

async function ConnectDb() {
  try {
    // console.log(process.env.MONGO_URL);
    
    await mongoose.connect(process.env.MONGO_URL) 

        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Database connection error", error)
        process.exit(1)
    }
}

export default ConnectDb