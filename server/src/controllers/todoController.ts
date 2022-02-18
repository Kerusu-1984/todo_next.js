import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/",async (req: Request, res: Response) => {
    const todos = await prisma.task.findMany({
        where: { id:req!.session!.user_id }
    });
    res.json( todos );
});

router.get("/:id", async (req: Request, res: Response) =>{
    const task = await prisma.task.findUnique({
        where: { id: parseInt(req.params?.id) },
    })
    res.json( task );
});

router.post("/",async (req:Request, res: Response) => {
    const { text } = req.body;
    const task = await prisma.task.create({
        data: { text:text, completed:false, user_id:req!.session!.user_id=3 }
    });
    res.json( task );
});

router.put("/:id",async (req: Request, res:Response) => {
    const { text,completed } = req.body;
    const task = await prisma.task.update({
        where: { id: parseInt(req.params?.id) },
        data: { text,completed  },
    });
    res.json( task );
});

router.delete("/:id",async (req: Request, res: Response) => {
    const task = await prisma.task.delete({
        where: { id: parseInt(req.params?.id) },
    });
    res.json( task )
});



export default router