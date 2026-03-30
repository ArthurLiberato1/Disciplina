import express from "express";
import __dirname from "./util/pathUtils.js";
import path from "path";
import {
    staticMiddleware,
    urlencodedMiddleware,
    jsonMiddleware,
    securityMiddleware,
    compressionMiddleware,
    ratedLimit,
    morganMiddleware
} from "./middlewares/middlewares"
import router from './routes/routes.js'
import Database from './config/db.js'
import dotenv from 'dotenv'
import session from 'express-session'

dotenv.config();

const app=express();
const port=process.env.PORT;

Database();

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret:'fipp-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(staticMiddleware);
app.use(urlencodedMiddleware);
app.use(jsonMiddleware);
app.use(securityMiddleware);
app.use(compressionMiddleware);
app.use(ratedLimit);
app.use(morganMiddleware);

app.use(router);
app.listen(port, ()=>{
    console.log(`Servidor ativo na porta ${port}`)
})
