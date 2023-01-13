import React, { useState, useContext, useEffect } from "react";



import {Link} from 'react-router-dom'
// import axios from "axios";

import axios from "axios";
import "./closeFriend.css";
import { Add, Remove } from "@material-ui/icons";
// import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { sendRequest } from "../../socketio.service";

// console.log("auth context =", AuthContext);

// import { AuthContext } from "../../context/AuthContext";

function CloseFriend({ user , me:currentUser}) {
  console.log(`user is ${user._id}`);
  console.log(`me is ${currentUser.name}`);
  

  //console.log("current user is = ", currentUser);
  
  //console.log("user id =", user._id)
  let checkIt = ()=>{
    for(let i=0;i<currentUser.followings.length;i++){
      if(user._id===currentUser.followings[i])return true;
    }
    return false;
  }
  let callMe = async()=>{
    // console.log('i am in call me')
    try{
    if(currentUser.followings.length>0 &&checkIt())setFollowed(1);
    else{
    
        axios.get(`http://localhost:8000/friendrequest/${currentUser._id}/${user.email}/isrequested`)
        .then((value)=>{
          console.log(value.data);
          if(value.data)setFollowed(-1);
          else setFollowed(0);
        })
        .catch((err)=>{
          console.log(err);
          setFollowed(0);
        })      
    }
   }
   catch(err){
    console.log(err);
  }
  }
 let [followed, setFollowed] = useState(0);
  useEffect(()=>{
    callMe();
  },[])

   console.log("follower user is =",followed);

   const handleClick = async () => {
    // console.log(followed);
    try {
      if (followed===1) {
        await axios.put(`http://localhost:8000/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        setFollowed(0);
        // dispatch({ type: "UNFOLLOW", payload: user._id });
      } else if(followed ===0){
        await axios.post(`http://localhost:8000/friendrequest/${currentUser._id}/sent`,{
          Email:user.email
        })
        sendRequest({Name:currentUser.name,senderEmail:currentUser.email,recieverEmail:user.email,recieverId:user._id});
        setFollowed(-1);
        /*await axios.put(`http://localhost:8000/users/${user._id}/follow`, {
          userId: currentUser._id,
        });*/
        // dispatch({ type: "FOLLOW", payload: user._id });
      }
  
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.imageUrl} alt="" />
      <span className="sidebarFriendName"><Link to={`/feeds/userprofile/${user.name}`} id="UserNames" >{user.name}</Link></span>
      <span className= "btnRight">
        {user.name !== currentUser.name && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            
            {followed===1 ? "Unfollow" : followed===0 ? "Follow":"Requested"}
            {followed===1 ? <Remove /> : followed===0 ? <Add />: ""}
          </button>
        )}
      </span>
    </li>
  );
}

export default CloseFriend;
