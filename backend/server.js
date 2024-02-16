import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"


import connectToMongoDB from "./db/connecttoMongoDB.js";

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();
app.use(cookieParser());
app.use(express.json()); // to parse the incoming requests with JSON payloads from req.body
app.use("/api/auth", authRoutes);  //middleware
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);



//  app.post("/", (req, res) => {
//      // root route http://localhost:5000/
//      res.send("Hello World");
//  });

app.listen(PORT,()=> {
    connectToMongoDB();
    console.log("Server is Running on port ${PORT}");
});



