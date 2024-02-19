import express from 'express';
import { Msg } from '../models/msgModel.js';
import { User } from '../models/userModel.js';
import loginRoute from '../routes/loginRoute.js';
import 'nodemailer'
import Jwt from 'jsonwebtoken';




const router = express.Router();

router.post('/:id', async (req,res) => {
    // console.log(req.body.Message)
    const { id } = req.params
    // console.log(id)
    const token = req.headers['x-access-token']
    try {
        if(!req.body.Message){
            return response.status(400).send({
                message: 'send all files'
            })
        };

        const newmsg = {
            Message: req.body.Message,
            userId: id
        };

        const messagess = await Msg.create(newmsg)
        // console.log(messagess)
        return res.status(201).send(messagess)
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        // const token = req.headers['x-access-token']
        // console.log(req)
        // const decode = Jwt.verify(token, 'secret123')
        const { id } = req.params
        // console.log(await loginRoute.router.response.user)
        const messages = await Msg.find({
            userId: id,
        })
        return res.status(200).json(
            {
                count: messages.length,
                data: messages
            }
        )
    }
    catch(error){
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})

export default router