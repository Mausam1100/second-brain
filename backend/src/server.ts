import { connectDB } from "./db/db.js";
import app from "./app.js";

connectDB()
.then(() => {
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log("Server is running at PORT: ", PORT)
    })

    app.get('/', (req, res) => {
        res.send("Hello World!")
    })
})
.catch((error) => {
    console.log(`MongoDB Connection failed: `, error)
})