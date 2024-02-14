import Menu from '../components/Menu';
import { Link,  useLocation, useNavigate } from 'react-router-dom';
import { useState,useEffect,useContext } from 'react';
import edit from '../img/edit.png';
import del from '../img/delete.png';
import moment from "moment";
import { AuthContext } from '../context/authcontext';
import axios from 'axios';

const Single = () => {

  const Navigate=useNavigate();

  const [post,setPost]=useState([]);

  const location=useLocation().pathname;

  const {currentUser} =useContext(AuthContext);  

  const postId =location.split("/")[2]
 

  useEffect(()=>{
     
   const fetchData = async ()=>{
    try{
      console.log(postId);
      const res=await axios.get(`/post/getpost/${postId}`)
     
      setPost(res.data);
      
    }
    catch(err){
      console.log(err);
    }
   }

   fetchData();
  },[postId]
  )



  console.log(post);
  const handledelete =async ()=>{
    try{
      await axios.delete(`/post/deletepost/${postId}`)
      Navigate('/');
    }
    catch(err){
      return console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className='single'>
      <div className="content">
        <img src={`../uploadImg/${post?.image}`} alt="" />
        <div className="user">
          {post.img &&
            <img src={post.img} alt="" />}
        
        <div className="info">
          <span>{post.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
          
        </div>
        { currentUser.username === post.username &&
        <div className="edit">
          <Link to="/Write?edit=2" state={post} >
          <img src={edit} alt="" />
          </Link>
          <img  onClick={handledelete} src={del} alt="" />
        </div>}
      </div>
      <h1>{post.title}</h1>
      <p>{getText(post.desc)}</p></div>
      <div className="menu">
            <Menu cat={post.cat}/>
      </div>
    </div>
  )
}

export default Single
