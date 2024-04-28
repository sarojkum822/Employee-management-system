import { app } from "./app.js";
import connectDB from './config/db.js'

connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgRed.white);
})