import {db} from "../db.js";
import jwt from "jsonwebtoken"

export const getposts =(req,res)=>{
    const q= req.query.cat? "SELECT * FROM post WHERE cat=?" : "SELECT * FROM post";
    db.query(q,[req.query.cat],(err,data)=>{
        if (err)return res.status(500).send(err);;

        return  res.status(200).json(data);
    })
};

export const getpost=(req,res)=>{
    const q= "select  `username`,`title`,`desc`,`image`,`img`,`date`,`cat`,p.id from users u JOIN post p ON u.id = p.uid WHERE  p.id=?"
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data[0]);
        
    })
};




export const addpost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO post(`title`, `desc`, `image`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("Post has been created.");
    });
  }
  );
};


export const deletepost =(req,res)=>{
    const token=req.cookies.access_token;
   const  postId=req.params.id;
    
    if(!token)
    {
        res.status(401).json("Not authenticated")
    }
    else{
        jwt.verify(token,"jwtkey",(err,userInfo)=>{
            if(err) return req.staus(403).json("Token is not valid");
           

            const q="delete from post where id=?  and uid=?";

            db.query(q,[postId,userInfo.id],(err,data)=>{
                if (err) return res.status(403).json("you can delete your owm post! ")
            
                return res.json("Post has been deleted");
            })
        })
    }
};


export const updatepost =(req,res)=>{
   
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "update post SET `title`=?,`desc`=?,`image`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

      const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
      const postId = req.params.id;
    
    db.query(q, [...values,postId,userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  }
  );
};