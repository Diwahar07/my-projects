import {db} from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const register=(req,res)=>{

    //check if user exist
   const q='select * from users where username=? or email=?';

    db.query(q,[req.body.username,req.body.email],(err,result)=>{
    if (err) return err;

    else if(result.length){
        res.status(409).json("already exist")
    }
    else{

    //HAsh the password
    const salt=bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    console.log(hash);

    //insert the user data
    const q="insert into users(username,email,password) values(?)";
    const values =[req.body.username,req.body.email,hash];
    db.query(q,[values],(err,result)=>{
        if(err) return err;
       
        else { res.send("inserted successfully")
                console.log("inserted successfully"); }
    });
    }

   });
}
export const login=(req,res)=>{

   
    const q="select * from users where username=?";
    db.query(q,[req.body.username], 
         (err,data)=>{
           if (err) return err;
           else if(data.length === 0) return res.status(404).send("User not found!");

           //check  user
          
           
            const checkPassword = bcrypt.compareSync(
              req.body.password,
              data[0].password
              );
            
           

           if(!checkPassword) return res.status(400).send("incorrect username or password");
           else  {
                   
              const token=jwt.sign({id:data[0].id},"jwtkey");
              const {password,...other}=data[0];

              res.cookie("access_token",token,{
                httpOnly:true
              }).status(200).json(other)
           }

          
        })
}

export const logout=(req,res)=>{
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};