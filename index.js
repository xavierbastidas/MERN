import "dotenv/config";
import "./database/connectdb.js";
import  express from "express";
import cors  from  "cors";
import authRouter from './routes/auth.route.js';
import linkRouter from './routes/link.route.js';
import redirectRouter from './routes/redirect.router.js';
import cookieParser from "cookie-parser";
const app  = express();
const  whiteList = [process.env.ORIGIN1,process.env.ORIGIN2];
 app.use(
    cors({
  origin:function(origin,callback){
   if(!origin || whiteList.includes(origin)){
    return callback(null,origin);
   }
  return callback(
    "Error de CORS origin: "+origin+" No autorizado!"
    );
 },
})
);

app.use(express.json());
app.use(cookieParser());
//ejemplo back redirect (opcional)
app.use('/',redirectRouter);
app.use('/api/auth',authRouter);
app.use('/api/links',linkRouter);
//Solo para el ejemplo de Login/token
//app.use(express.static('public'));
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`The server is listening on http://localhost:${PORT}`))





