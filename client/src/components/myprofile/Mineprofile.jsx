import React from 'react'
import {Users} from '../../dummyData'
import { useState,useEffect } from 'react';
import './mineprofile.css'
import { StoreMallDirectoryRounded } from '@material-ui/icons';
import axios from 'axios';
import { MdFileUpload } from "react-icons/md";


const Mineprofile = ({userName}) => {
    // console.log(userName);
   
    let [Name,setName] = useState("");
    let [Image,setImage] = useState("");
    let [Email,setEmail] = useState("");
    let [file,setFile] = useState("");
    let getDetails = async()=>{
      axios({
        method:'get',
        url:`http://localhost:8000/feeds/userprofile/${userName}`,

      })
      .then((res)=>{
        setName(res.data[0].name);
        setImage(res.data[0].imageUrl);
        setEmail(res.data[0].email);
        console.log(res);
      })
      .catch((err)=>{console.log(err)});
    }

    let setLocalStorage = ()=>{
        
        const user = JSON.parse(localStorage.getItem("userData"))
        user.profileObj.imageUrl = Image;
        localStorage.setItem('userData',JSON.stringify(user));
    }
    useEffect(()=>{
      getDetails();
      
    },[])
    setLocalStorage();

    let arr=Name.split(' ');
    let firstName = arr[0];
    let lastName = arr[1];
    //  console.log(typeof(firstName));

    // console.log(firstName);
    // console.log(lastName);
    const name=Name;
    const image=Image;
    const info='Sarah Wood is co-founder and COO of video ad tec company,';

    let [userReg,setUserReg] = useState({
        FirstName: "",
        LastName: "",
        Designation: "",
        MyWebsite: "",
        Birthday: "",
        City: "",
        State: "",
        Zip: "",
        Gender: "",
       

    })    

    

    let FirstName=firstName;
    let LastName=lastName;
    let Designation=userReg.Designation;
    let MyWebsite = userReg.MyWebsite;
    let Birthday = userReg.Birthday.toString();
    let City= userReg.City;
    let State= userReg.State;
    let Zip= userReg.Zip;
    let Gender=userReg.Gender;
   
    

    let handleChange = (e)=>{
        let name=e.target.name;
        let value=e.target.value;

        setUserReg({...userReg,[name]:value})
        


    }

    let postModel = async()=>{
        axios({
            method:'post',
            url:`http://localhost:8000/feeds/myprofile/${userName}`,
            data:{
                FirstName:FirstName,
                LastName:LastName,
                Designation: Designation,
                MyWebsite: MyWebsite,
                Birthday: Birthday,
                City: City,
                State: State,
                Zip: Zip,
                Gender: Gender,
               
               
            }
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    let SubmitIt = (e)=>{
        e.preventDefault();
      
        
        postModel();
        resetAll();
    }
    
    

    let resetAll = ()=>{
        setUserReg({
            FirstName: "",
            LastName: "",
            Designation:"",
            MyWebsite:"",
            Birthday:"",
            City:"",
            State:"",
            Zip:"",
            Gender:""
            
        })
    }

    let handleImage = (e)=>{
     
        console.log(file,'i am here');
        if(file==="")return ;
        
        console.log('handleImage is running');
        const formData = new FormData();
        formData.append("photo",file);

        const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };

        const url = `http://localhost:8000/authusers/${name}`;
        axios
           .put(url,formData,config)
           .then((res)=>{
               console.log(res);
               alert('Image uploaded');
               window.location.reload();
           })
           .catch((err)=>{
               console.log(err);
           })
           setFile("");
        

    }
    console.log(file);

    

  return (
    <>
      <div className="mineProfile">
        <div className='upper_Container'>
          <div className='img_Container'>
            <img src={image} alt={name} width="100px"
              height="100px"  />
              <input
                  type="file"
                  id="file"
                  name="file"
                  
                  onChange={(e) => {
                      
                    if (e.target.files.length > 0) {
                      setFile(e.target.files[0]);
                      
                    }
                  }}

                  
                />
                <label htmlFor="file" className='FileUpload'>
                  < MdFileUpload onMouseLeave={handleImage}/>
                </label>                
                
           </div> 
        </div>
        <div className='lower_Container'>
          <h1 style={{margin:"30px"}}>{name}</h1>
                  <div className='Detailed_Info'>
                      <div className='Row'>
                          <div className='FirstName'>
                              <label>First  Name</label>
                              <input type='text' 
                              name="FirstName" 
                              id="FirstName"
                              placeholder="FirstName" 
                              value={firstName} 
                              onChange={handleChange} />
                          </div>

                          <div className='LastName'>
                              <label>Last Name</label>
                              <input type='text' 
                              name="LastName" 
                              id="LastName"
                              placeholder="LastName"
                              value={lastName} 
                              onChange={handleChange}/>
                          </div>

                      </div>

                      <div className='Row'>
                          <div className='Designation'>
                              <label>Designation</label>
                              <input type='text' 
                              name="Designation" 
                              id="Designation"
                              placeholder='Co-founder' 
                              value={Designation} 
                              onChange={handleChange} />
                          </div>

                          <div className='MyWebsite'>
                              <label>My Website</label>
                              <input type='text' 
                              name="MyWebsite" 
                              id="MyWebsite"
                              value={MyWebsite}
                              placeholder='Sarahwood.org' 
                              onChange={handleChange}/>

                          </div>

                      </div>

                      <div className='Row'>
                          <div className='Gender' >
                              <label>Gender </label>
                             
                              <div onChange={handleChange}>
                                <input type="radio" value="Male" name="Gender" /> Male
                                <input type="radio" value="Female" name="Gender" /> Female
               
                            </div>
                         
                          </div>

                          <div className='Birthday'>
                              <label>Birthday</label>
                              <input type='date' 
                              name="Birthday" 
                              id="Birthday" 
                              value={Birthday}
                              onChange={handleChange} />
                          </div>

                      </div>

                      <div className='Row'>
                          <div className='City'>
                          <label>City</label>
                              <input type='text' 
                              name="City"
                              id="City"
                              placeholder='City' 
                              value={City}
                              onChange={handleChange} />
                          </div>
                          
                          <div className='State'>
                          <label>State</label>
                              <input type='text' 
                              name="State" 
                              id="State"
                              placeholder='UP' 
                              value={State}
                              onChange={handleChange} />
                          </div>

                          

                      </div>
                      <div className='Row'>
                      <div className='Zip'>
                          <label>Zip</label>
                              <input type='text'
                               name="Zip"
                               id="Zip"
                              placeholder='201310' 
                              value={Zip}
                              onChange={handleChange} />
                          </div>
                      </div>
                      
                      <div className='Row'>
                          <div className='SimpleRow'>
                          <button type="button" className='Btn'
                           style={{color:"white",backgroundColor:"blue"}} 
                           onClick={SubmitIt}>Save</button>
                          <button type="button" className='Btn' 
                          style={{color:"blue",borderColor:"blue"}} 
                          onClick={resetAll} >Reset All</button>
                          </div>
                     
                      </div>

                      
                  </div>
         
        </div>

      </div>
    
    </>
  )
}

export default Mineprofile
