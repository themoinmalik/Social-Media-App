import React, { useState, useEffect } from "react";
import "./rightbar.css";
// import {Link} from "react-router-dom"

import Online from "../online/Online";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import axios from "axios";

export default function Rightbar() {
  const { profileObj: currentUser } = JSON.parse(
    localStorage.getItem("userData")
  );

  // console.log("current use is =", currentUser);
  // console.log("current use email is =", currentUser.email)
  // console.log("current use id is =", currentUser._id)

  // const [friends, setFriends] = useState([]);
  // console.log("user friends =",friends);
  // console.log("current user id is =",currentUser.id);
  // useEffect(() => {
  //   const getFriends = async () => {
  //     try {
  //       const friendList = await axios.get("localhost:8000/users/friends/" + currentUser.id);
  //       setFriends(friendList.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getFriends();
  // });

  const [users, setUsers] = useState([]);

  const me = users.filter((user) => user.email === currentUser.email)[0];

  const getUsers = () => {
    axios
      .get("http://localhost:8000/authusers")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const otherUsers = users.filter((user) => user.email !== currentUser.email);

  // console.log("my data =", me);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 others friends</b> having Birthday Today
          </span>
        </div>

        {/* suggested friends   */}
        {/* using dummy data  */}
        <h4 className="rightbarTitle">Suggestions</h4>
        <ul className="sidebarFriendList">
          {otherUsers.map((u) => {
            return (
              <CloseFriend key={u.id} user={u} me={me}/>
            );
          })}
        </ul>
        <hr />

        {/* user friends  */}

        {/* <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.imageUrl
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.name}</span>
              </div>
            </Link>
          ))}
        </div>
        <hr/> */}

        {/* online friends  */}
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendlist">
          {Users.map((u) => {
            return <Online key={u.id} user={u} />;
          })}
        </ul>
      </div>
    </div>
  );
}