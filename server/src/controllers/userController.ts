import { Router, Request, Response } from "express";
import { PrismaClient,Prisma } from "@prisma/client";


const router = Router();
const prisma = new PrismaClient();

router.post('/signup', async(req:Request,res:Response) => {
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

router.post('/login', async(req, res) => {
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
      res.json({user_id:req!.session!.user_id})
    
  });

router.get('/logout', (req, res) => {
    req!.session!.destroy((err) => {
      res.redirect("/");
    });
  });

  export default router