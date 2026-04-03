import mongoose from "mongoose";

// connect to MongoDB
const connect_db = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1);
    }
};

export default connect_db;