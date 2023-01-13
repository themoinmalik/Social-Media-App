import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './postComment.css'
import {AiTwotoneDelete,AiTwotoneEdit} from "react-icons/ai";

const PostComment = ({post,callBack,flag}) => {

    let [comment,setComment] = useState("");
    let [readComment,setReadComment] = useState([]);
    let [reRender,setreRender] = useState(false);
    
    callBack(readComment.length);
    
    // console.log(readComment.length);
    let FetchComments = async()=>{
      axios.get(`http://localhost:8000/postupload/comment/${post._id}`)
      .then((res)=>{
        let result = JSON.parse(JSON.stringify(res.data));
        setReadComment(Object.entries(result.comments));
       
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    useEffect(()=>{
      FetchComments();
    },[reRender]);


    //getting data from localstorage
    let myProfile = JSON.parse(localStorage.getItem('userData'));
    myProfile = myProfile.profileObj;
    
    
    
    let changeComment = (e)=>{
        e.preventDefault();
        setComment(e.target.value);
        
    }

    //posting comment
    let addComment = async(e)=>{
      if(e.key!=='Enter'){
        console.log('Other key is pressed');
        return ;
      }
        await axios.post(`http://localhost:8000/postupload/comment/${post._id}`,{
          id:post._id,
         comments:[{
         author:myProfile.email,
         name:myProfile.name,
         comment:comment
      }]
        })
        .then((response)=>{
          console.log(response);
        })
        .catch((err)=>{
          console.log(err); 
        })
        setComment("");
        setreRender(!reRender);
        
    }

    /*let editComment = (value)=>{
      if(value[1].name!=myProfile.name)return ;

      setComment(value[1].comment);

      axios.put(`http://localhost:8000/postupload/comment/${post._id}/${value[1]._id}`,{
        comment:comment
      })
      .then((res)=>{console.log(res)})
      .catch((err)=>console.log(err))
    }*/

    let deleteComment = async(value)=>{
      if(value[1].name!=myProfile.name)return ;

      await axios.delete(`http://localhost:8000/postupload/comment/${post._id}/${value[1]._id}`)
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
      setreRender(!reRender);
      
    }
    


  return (
    <>
    {flag&&
    <div className='Postcomment'>
        <div className='AddComment'>
            <img src={myProfile.imageUrl} class='commentImage'/>
            <input type='text'
            className='InputComment' placeholder="  Write a comment..." value={comment} onChange={changeComment} onKeyDown={addComment}/>
           
        </div>
        
        <div className='ReadComment'>
           {readComment.map((value)=><div className='showComment'>
             
             <div className="UserContainer">
             <div className='Row'>
             <h3>{value[1].name}</h3>
             </div>
             <div className='Row'>
             {value[1].comment}
             </div>
             </div>
          
             <div className='CommentVox'>
               {/*<AiTwotoneEdit onClick={()=>editComment(value)}/>*/}
               <AiTwotoneDelete onClick={()=>{deleteComment(value)}} 
                onMouseEnter={(e)=>e.target.style.fontSize='x-large'}
                onMouseLeave={(e)=>e.target.style.fontSize='large'} 
                style={{'fontSize':'large'}} /> 

               </div>
             </div>)}
              
        </div>
      
    </div>
    }
    </>
  )
}

export default PostComment
