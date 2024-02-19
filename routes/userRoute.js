import express, { request } from 'express';
import {User} from '../models/userModel.js';
import bcrypt from 'bcryptjs';
const router = express.Router();

router.post('/', async (req,res)=>{
    try {
        const password = await bcrypt.hash(req.body.Password, 10)
        // bcryptjs.hash(req.body.Password, 10)
        const newuser = {
            Name: req.body.Name,
            Email: req.body.Email,
            Password: password
        };

        const users = await User.create(newuser)
        return res.status(201).send(users)

    } catch (error) {
        console.log(error.message)
    }
})


export default router