import React from 'react'
import "./profile.css"
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Topbar from '../../components/topbar/Topbar'
import Profiles from '../../components/userProfiles/Profiles'
import {useParams} from 'react-router-dom'

function Profile() {
  let {name} = useParams();
 
  return (
    <>
    
    <Topbar />
    <div className="profileContainer">
      
      <Profiles userName={name}/>
      <Rightbar />
    </div>
    </>
    
  )
}

export default Profile