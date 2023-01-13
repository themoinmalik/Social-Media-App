import React from 'react'
import Mineprofile from '../../components/myprofile/Mineprofile'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Topbar from '../../components/topbar/Topbar'
import { useParams } from 'react-router-dom'
const MyProfile = () => {
   let {name} = useParams();


  return (
    <>
    
    <Topbar />
    <div className="profileContainer">
      
      <Mineprofile userName={name}/>
      <Rightbar />
    </div>
    </>
  )
}

export default MyProfile
