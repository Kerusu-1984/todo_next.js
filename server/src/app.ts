import express, { Router } from "express";
import session from "express-session"
import cors from "cors";
import {Pool} from "pg"
import todoController from "./controllers/todoController";
import userController from "./controllers/userController";
import connectpg from "connect-pg-simple";
import { PrismaClient } from "@prisma/client";
import { idText } from "typescript";

declare module 'express-session' {
  interface SessionData {
    user_id: number;
  }
}
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 ,
//     credentials: true
//   }
// const app = express();
// const pgSession = connectpg(session)
// const pgPool = new Pool({
//   host:"db",
//   user:"user",
//   password:"pass",
//   database:"todoApi"
// })
// app.use(session({
//   store:new pgSession({
//     pool:pgPool,
//     tableName:"Session"
//   }),
//   name: "qid",
//   secret: "khebqmxofqwss",
//   resave: false,
//   saveUninitialized: false,
//   cookie:{
//     httpOnly: true,
//     secure: false,
//     maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
//   }
// }));
// // app.use(cors(corsOptions));
// app.use(express.json());

// // app.use("/api",userController);
// // // app.use((req,res,next)=>{
// // //   if (req!.session!.user_id) {
// // //     next();
// // //   }else{
// // //     res.redirect("/api/login")
// // //   }
// // // })
// // app.use("/todos",todoController);
// // app.get("/",(req,res) =>{
// //     res.writeHead(200, { "Content-Type": "text/plain" });
// //     res.end("hello express\n");
// // });
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
const prisma = new PrismaClient();

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

app.get("/todos",async (req, res) => {
  console.log(req!.session.user_id)
  if (!req.session.user_id){
    console.log("un")
    res.status(403).send;
    return;
  }
  const todos = await prisma.task.findMany({
      where: { user_id:req!.session!.user_id }
  });
  console.log(todos)
  res.json( todos );
});

app.get("/todos/:id", async (req, res) =>{
  const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params?.id) },
  })
  res.json( task );
});

app.post("/todos",async (req, res) => {
  const { text } = req.body;
  console.log("todopost"+req!.session.user_id)
  console.log({data: { text:text, completed:false, user_id:req!.session!.user_id }})
  const user_id = req.session.user_id ? req.session.user_id:0
  const task = await prisma.task.create({
      data: { text:text, completed:false, user_id }
  });
  console.log("todopost"+req!.session.user_id)
  res.json( task );
});

app.put("/todos/:id",async (req, res) => {
  const { text,completed } = req.body;
  const task = await prisma.task.update({
      where: { id: parseInt(req.params?.id) },
      data: { text,completed  },
  });
  res.json( task );
});

app.delete("/todos/:id",async (req, res) => {
  const task = await prisma.task.delete({
      where: { id: parseInt(req.params?.id) },
  });
  res.json( task )
});

app.post('/api/signup', async(req,res) => {
  console.log(req.body)
  const { name,password,email } = req.body;
  try{const user = await prisma.user.create({
    data: { name,password,email },
  })
  res.json({ user })
  } catch(err){
    res.status(409).send({err});
    return;
  }
});

app.post('/api/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const User = await prisma.user.findUnique({where: {email}});

    if (User === null) {
      res.status(401).send({error:"アカウントが存在しない"});
      return;
    }
    
    if (User.password !== password){
      res.status(401).send({error:"パスワードが違う"});
      return;
    }
      req!.session!.user_id = User.id;
      console.log({id:User.id,email:User.email})
      res.json({name:User.name})
      console.log({name:User.name})    
  });

app.post('/api/logout', (req, res) => {
    req!.session!.destroy(()=>{
      res.send("logout");
    });
  });

app.get('/', (req, res) => {
  if (req.session.user_id) {
    req.session.user_id++;
  } else {
    req.session.user_id = 1;
  }
  res.json({user_id : req.session.user_id});
})
export default app