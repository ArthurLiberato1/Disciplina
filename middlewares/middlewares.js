import express from 'express';
import helmet from 'helmet';
import __dirname from '../util/pathUtils';
import fs from 'fs'
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan'


const staticMiddleware=express.static(path.join(__dirname,'assets'));
const urlencodedMiddleware=express.urlencoded({extended:true});
const jsonMiddleware=express.json();
const securityMiddleware=helmet();
const compressionMiddleware=compression();
const ratedLimit= rateLimit({
    windowMs: 10*60*1000,
    max: 100,
    message: "Muitas requisições, tente novamente em 10 minutos."
});
const morganMiddleware=morgan('combined',{stream: logFile});

export{
    staticMiddleware,
    urlencodedMiddleware,
    jsonMiddleware,
    securityMiddleware,
    compressionMiddleware,
    ratedLimit,
    morganMiddleware
};