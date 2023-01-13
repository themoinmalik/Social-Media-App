import "./post.css";
import LazyLoad from "react-lazyload";
import { MoreVert } from "@material-ui/icons";
import PostComment from "../postComment/PostComment";
import { useEffect, useState } from "react";
import axios from "axios";
import { GoReport } from "react-icons/go";


function Post({post}) {

  useEffect(()=>{
      fetchlikeDislike();
      checkisitReported();
  },[])

  const year=post.date.slice(0,4);
  const month=post.date.slice(5,7);
  const day=post.date.slice(8,10);
  const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
  
  //when to show comment
  let [flag,setFlag] = useState(false);
  //no of comments
  let [noComments,setnoComments] = useState(0);
  

  //getting data from localstorage
  let myProfile = JSON.parse(localStorage.getItem('userData'));
  myProfile = myProfile.profileObj;

  //like and heart on post
  let [like,setLike] = useState(0);
  let [heart,setHeart] = useState(0);

  let showComments = ()=>{
    setFlag(!flag);
  }

  let commentCallback = (value)=>{
      setnoComments(value);
  }

  let fetchlikeDislike = async()=>{
    console.log('i am fetchlikedislike');
    axios.get(`http://localhost:8000/postupload/likeDislike/${post._id}`)
    .then((res)=>{
      setLike(res.data.like.length);
      setHeart(res.data.heart.length);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  let likeIt = async()=>{
    let {data}= await axios.post(`http://localhost:8000/postupload/likeDislike/${post._id}/1`,{
      id:post._id,
      email:myProfile.email
    })
    
    fetchlikeDislike();
  }
  
  let heartIt = async()=>{
    let {data}=await axios.post(`http://localhost:8000/postupload/likeDislike/${post._id}/0`,{
      id:post._id,
      email:myProfile.email
    })
    
    fetchlikeDislike();
  }

  let [color,setColor] = useState('black');
  let reportPost = async()=>{
    let {data} = await axios.post(`http://localhost:8000/postupload/report/${post._id}/${myProfile.email}`,{
      postIds:[
        {
          id:post._id,
          user:[{'email':myProfile.email}]
        }
      ]
    })
    // console.log('i reported this post');

    setColor('red');
  }

  let checkisitReported = async()=>{
    axios.get(`http://localhost:8000/postupload/report/${post._id}/${myProfile.email}`)
    .then((res)=>{
  
      if(res.data[0].postIds[0].user[0].email===myProfile.email){
        setColor('red');
      }
    })
    .catch((err)=>{
      console.log(err);
    })

    
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={post.userImg}
              alt="user_profile_img"
            />
            <span className="postUsername">{post.userName}</span>
            <span className="postDate">{`${day} ${months[month-1]} ${year}`}</span>
          </div>
          <div className="postTopRight">
            <GoReport onClick={reportPost}  style={{'color':`${color}`,'fontSize':'x-large'}} onMouseEnter={(e)=>e.target.style.fontSize='xx-large'}
                onMouseLeave={(e)=>e.target.style.fontSize='x-large'} 
                />
            <MoreVert/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          
          <img className="postImg" src={post.imgUrl} alt="post_img" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" alt="like_img" onClick={likeIt} />
            <span className="postLikeCounter" >{like}</span>

            <img className="likeIcon" src="assets/heart.png" alt="love_img" onClick={heartIt} />
            <span className="postLikeCounter" >{heart}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={showComments}> {noComments} comments</span>
          </div>
        </div>
        <div className="commentBox">
        <PostComment post={post} callBack={commentCallback} flag={flag} />
        </div>
        
        
      </div>
    </div>
  );
}

export default Post;
