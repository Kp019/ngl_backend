import express from 'express';
import Jwt from 'jsonwebtoken';
import {User} from '../models/userModel.js';
import bcrypt from 'bcryptjs';


const router = express()
const user_tkn = ''

router.post('/', async (req,res)=>{
    const user = await User.findOne({
        Email: req.body.Email,
    })

    if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

    const ispasswordvalid = await bcrypt.compare(
        req.body.Password,
        user.Password
    )
    
    if(ispasswordvalid){
        const token = Jwt.sign({
            
            Name: user.Name,
            Email: user.Email,
            ID: user._id

        }, 'secret123', { expiresIn: '10' })
        // user_tkn = token
        return res.json({status: 'ok', user: token})

    }else{

        return res.json({status: 'error', user: false})
    }
})

const exports = {
    router,
    user_tkn,
}


export default exports