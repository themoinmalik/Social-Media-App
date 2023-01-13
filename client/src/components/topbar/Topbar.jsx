import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, VideoCallRounded } from "@material-ui/icons";
import axios from "axios";
import { acceptedRequest } from "../../socketio.service";
import "./topbar.css";
import Triee from "../../features/trie";
import {Insert,getValueName,getValueUrl} from '../../features/hashmap';




function Topbar() {

  
  // logout button
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // chat application

  const chatButton = () => {
    navigate("/messenger");
  };

  // calling user

  const user = JSON.parse(localStorage.getItem("userData"));
 

  // search the user by name

  const [userName, setUserName] = useState("");
  const [buzzUsers, setBuzzUsers] = useState([]);
  let [AllUsers,setAllusers] = useState([]);
  let [nameOfUsers,setNameOfUser] = useState([]);

  console.log(AllUsers);
  // console.log("my name is =", userName);
  console.log("buzz users are =", buzzUsers);
  
  let getAllUsers = async()=>{
    await axios
        .get(`http://localhost:8000/authusers`)
        .then((response) => {
          console.log(response.data);
          response.data.map((valueName)=>setAllusers((values)=>[...values,valueName]));
        })
        .catch((err) => {
          console.log(err);
        });
  }
  let InsertData=()=>{
    AllUsers.map((value)=>Triee.insert(value.name.toLowerCase()));
    AllUsers.map((value)=>Insert(value.name,value.imageUrl));
  }
  const handleSubmit = async (e) => {
  
       console.log(Triee.find(e.target.value.toLowerCase()));

        setBuzzUsers([]);
        
      //  setUserName(e.target.value);
        setNameOfUser(Triee.find(e.target.value.toLowerCase()));
      
        nameOfUsers.map((value)=>setBuzzUsers((values)=>[...values,value]));
       
  };

  //search the user by name,email and friendList
  let [id,setId] = useState('');
  let [friendList,setFriendlist] = useState([]);
  let [names,setNames] = useState([]);
  let [emailName,setemailName] = useState([]);
  console.log(friendList);
  console.log(id);  
  console.log(names);
  

  let searchUser = ()=>{
     axios.get(`http://localhost:8000/authusers/${user.profileObj.name}`)
    .then((value)=>{
      
      setId(value.data[0]._id);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  let searchUserbyEmail = (list) =>{
    if(list===undefined)return ;
    list.map((user)=>{
      console.log(user);
      return (
      axios.get(`http://localhost:8000/authusers/${user.Email}/Email`)
      .then((value)=>{
        // console.log(value);
        
        setNames((values)=>[...values,{name:value.data[0].name,email:value.data[0].email,id:value.data[0]._id}]);
      })
      .catch((err)=>{
      console.log(err);
      }));
    })
  }
  
  let getFriendList = ()=>{
    axios.get(`http://localhost:8000/friendrequest/${id}`)
    .then((value)=>{
      
      setFriendlist(value.data.request);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  searchUser();
  
  useEffect(()=>{
    getAllUsers();
  },[])
  useEffect(()=>{
    
    getFriendList();
  },[id]);

  useEffect(()=>{
    InsertData();
  },[AllUsers]);

  useEffect(()=>{
    setNames([]);
    searchUserbyEmail(friendList);
  },[friendList]);

  //Request handling

  let reqAccepted = async(value)=>{
      await axios.delete(`http://localhost:8000/friendrequest/${id}/request/${value.email}`)

      await axios.delete(`http://localhost:8000/friendrequest/${value.id}/sentRequest/${user.profileObj.email}`)

      await axios.put(`http://localhost:8000/users/${id}/follow`, {
          userId: value.id,
        });

        getFriendList();
        acceptedRequest({recieverEmail:user.profileObj.email,senderName:value.name});
  }

  let cancelRequest = async(value)=>{
    await axios.delete(`http://localhost:8000/friendrequest/${id}/request/${value.email}`)

    await axios.delete(`http://localhost:8000/friendrequest/${value.id}/sentRequest/${user.profileObj.email}`)
      
  }

  return (
    <header className="topbarContainer">
      <nav>
        <ul>
          <li>
            <a href="/" id="ttn">
              <img
                src="http://www.bestmediainfo.com/wp-content/uploads/2014/03/TTN-logo.jpg"
                width="70"
                alt="ttn logo"
              />
            </a>
          </li>

          <div className="topbarCenter">
            <div className="searchbar">
              <Search className="searchIcon" />

              <input
                placeholder="Search for friends"
                className="searchInput"
                type="text"
                // value={userName}
                onChange={(e) => handleSubmit(e)}
                //onKeyUp={(e) => handleSubmit(e)}
              />
            </div>

            <div className = "srchResult">
            {buzzUsers.map((user) => {
              return (
                <li className="sidebarFriend">
                   <img
                    src={getValueUrl(user)}
                    alt=""
                    className="sidebarFriendImg"
                  /> 
                  <span className="sidebarFriendName">{getValueName(user)}</span>
                </li>
              );
            })}
          </div>
            
          </div>

          
          {/* search result  */}
          

          {/* // right side navbar compoenents */}

          <li id="space2" />
          <li>
            {/* user profile */}
            <img
              // src="https://pbs.twimg.com/profile_images/1505231632738881536/C1oQKyY3_400x400.jpg"
              src={user.profileObj.imageUrl}
              alt="moin malik"
              className="topbarImg"
            />
          </li>

          <li>
            <button
              onClick={chatButton}
              className="tooltip"
              data-tooltip="Message"
              id="btn_msg"
            >
              <i className="fab fa-facebook-messenger" />
            </button>
          </li>

          <li>
            <div className="dropdown">
            <button className="tooltip dropbtn" data-tooltip="Profile" id="btn_profile">
              <i className="fas fa-user-cog" />
            </button>
            <div className="dropdown-content">
              {
                names.map((value)=>{
                  
                  return (<div className="FriendList">
                    <p>{value.name}</p>
                    <button type="submit" className="cancelBtn" onClick={()=>cancelRequest(value)}>Cancel</button>
                    <button type="submit" className="acceptBtn" onClick={()=>reqAccepted(value)}>Accept</button>
                  </div>);
                })
              }
            </div>
            </div>
          </li>
          <li>
            <button
              onClick={logout}
              className="tooltip"
              data-tooltip="Profile"
              id="btn_profile"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Topbar;
