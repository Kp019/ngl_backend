import express, { response } from 'express';
import {PORT, MongodbUrl} from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import megRoute from './routes/megRoute.js';
import userRoute from './routes/userRoute.js';
import loginRoute from './routes/loginRoute.js';



const app = express();

app.use(express.json());


app.use(cors())

app.use(
    cors({
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
    })
)

app.get('/',(req,res)=>{
    return res.status(234).send('hiiiiii')
})


app.use('/mesgs', megRoute)
app.use('/register', userRoute)
app.use('/login', loginRoute.router)




mongoose.connect(MongodbUrl).then(()=>{
    console.log('connected')
    app.listen(PORT, ()=>{
        console.log(`server live at ${PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
})

