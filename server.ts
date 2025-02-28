import express from "express";
import cors from "cors";
import ExpenseRoutes from "./routes/expense-routes";
import WalletRoutes from "./routes/wallet-routes";

const app = express();
const corsOptions = {
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/expense', ExpenseRoutes);
app.use('/wallet', WalletRoutes);

app.listen(3000,(err) => {
    console.log("Server running on port 3000");
});