import mongoose from 'mongoose'

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://adminX:LugO7N9je8oK7SZr@cluster0.fzbgr1d.mongodb.net/todo");
        console.log("✅ MongoDB connected");
    }catch(error){
        if(error instanceof Error) {
            console.error("❌ MongoDB error:", error.message);
        } else {
            console.error("❌ MongoDB error:", error);
        }
        process.exit(1);
    }
}

export default connectDB;