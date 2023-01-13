import React, { useEffect, useState } from 'react';
import "./profiles.css";
import {FaUserPlus} from "react-icons/fa"
import {Users} from '../../dummyData'
import axios from 'axios';

function Profiles({userName}) {
    

    let [Name,setName] = useState("");
    let [Image,setImage] = useState("");
    let [Email,setEmail] = useState("");
    let getDetails = async()=>{
      axios({
        method:'get',
        url:`http://localhost:8000/feeds/userProfile/${userName}`,

      })
      .then((res)=>{
        if(res.data.length>0){
        setName(res.data[0].name);
        setImage(res.data[0].imageUrl);
        setEmail(res.data[0].email);}
        
      })
      .catch((err)=>{console.log(err)});
    }
 
      getDetails();
  
     console.log('i am below');
    const name=Name;
    const image=Image;
    const info=`${name} is co-founder and COO of video ad tec company,`;
    
  return (
      <>
      <div className="userProfile">
        <div className='upper_container'>
          <div className='img_container'>
            <img src={image} alt={name} width="100px"
              height="100px"  />
           </div>
        </div>
        <div className='lower_container'>
          <h1>{name}</h1>
          <h3>{info}</h3>
          <button className='AddFriend'><FaUserPlus /> Add Friend</button>
          <button className='visitWeb'>Visit Website </button>
        </div>

      </div>
    
    </>
  )
}

export default Profiles