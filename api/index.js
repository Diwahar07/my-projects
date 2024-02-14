import express from 'express';
import {db} from './db.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';


import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import authRoutes from './routes/auth.js';

const app=express();
const port=5000;

app.use(express.json());
app.use(cookieParser());



app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/post",postRoutes);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/client/public/uploadImg/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + file.originalname);
    }
  })

  const upload = multer({ storage})
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file=req.file;
    res.status(200).json(file.filename);
});

db.query("select 1",(err,result)=>{
    if(!err) 
    {
     console.log("DB is conected succesfully");
     app.listen(port,()=>{
         console.log(`app is runing port ${port}`);
     })
 
    }
 
    else throw err;
 })
 
