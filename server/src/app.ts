import express, { Router } from "express";
import session from "express-session"
import cors from "cors";
import {Pool} from "pg"
import todoController from "./controllers/todoController";
import userController from "./controllers/userController";
import connectpg from "connect-pg-simple";

declare module 'express-session' {
  interface SessionData {
    user_id: number;
  }
}
const pgSession = connectpg(session)
const pgPool = new Pool({
  host:"db",
  user:"user",
  password:"pass",
  database:"todoApi"
})
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 ,
    credentials: true
  }

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(session({
  store:new pgSession({
    pool:pgPool,
    tableName:"Session"
  }),
  name: "qid",
  secret: "khebqmxofqwss",
  resave: false,
  saveUninitialized: false,
  cookie:{
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
  }
}));
app.use("/todos",todoController);
app.use("/api",userController);


export default app