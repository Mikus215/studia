import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.js'
import companyRouter from './routes/company.js'

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(cookieParser())

app.use('/user', userRouter)
app.use('/company', companyRouter)

app.get('/', (req, res, next) => {
    res.send("A task for studies...")
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));