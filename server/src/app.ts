import express from "express";
import cors from "cors"
import taskController from "./controllers/todoController"

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 ,
    credentials: true
  }
const app = express();

app.use(cors(corsOptions))

app.use(express.json());


app.use("/todos",taskController);

app.get("/",(req,res) =>{
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("hello express\n");
});

export default app