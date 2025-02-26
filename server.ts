import express from "express";
import cors from "cors";

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.listen(3000,(err) => {
    console.log("Server running on port 3000");
});