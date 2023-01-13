import React, { useState } from 'react';
import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import "./home.css";
import { useEffect } from 'react'
import {intiateSocketConnection} from '../../socketio.service'
import { disconnectSocket } from '../../socketio.service'
import { Listen } from '../../socketio.service';
import {io} from 'socket.io-client';



function Home() {

  //getting data from localstorage
  let myProfile = JSON.parse(localStorage.getItem('userData'));
  myProfile = myProfile.profileObj;
  //let [socket,setSocket] = useState(io(process.env.REACT_APP_SOCKET_ENDPOINT));
  
  useEffect(()=>{
    intiateSocketConnection(myProfile.email);
    Listen();
    // socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
    // socket.emit('join',{email:myProfile.email});
    // console.log(`Connecting socket...`);
    // socket.on('user-joined',(msg)=>{
    //     alert(msg);
    // })
    return () =>{
      disconnectSocket();
    //   console.log('Disconnecting socket...');
    // if(socket) socket.disconnect();
    }
  })

  return (
    <>
    <Topbar/>
    <div className="homeContainer">
      <Sidebar/>
      <Feed/>
      <Rightbar/>
    </div>
    </>
  )
}

export default Home