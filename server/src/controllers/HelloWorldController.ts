import {Request, Response} from 'express'

export default class HelloWorldController {
  static index(req: Request, res: Response){
    console.log('=== index')
    res.send(JSON.stringify({"msg": "Hello World"}))
  }
}