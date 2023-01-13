import axios from 'axios';
import {io} from 'socket.io-client';

let socket;

export const intiateSocketConnection = (email)=>{
    socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
    socket.emit('join',{email:email});
    console.log(`Connecting socket...`);
    socket.on('user-joined',(msg)=>{
        console.log(msg);
    })
    
    
}
export const sendRequest = (data)=>{
    console.log(data);
    socket.emit('sentRequest',data);

}

export const acceptedRequest = (data)=>{
    socket.emit('acceptedReqest',data);
}

export const Listen = ()=>{
    console.log('socket user is listening for server');
    socket.on('recieveRequest',(data)=>{
        alert(`${data.Name} has sent you friendRequest`);
        axios.post(`http://localhost:8000/friendrequest/${data.recieverId}/recieve`,{
            Email:data.senderEmail
        })
        .then((value)=>{
            console.log(value);
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    socket.on('acceptReqMsg',(data)=>{
        alert(`${data.senderName} has accepted your friend request`);
    })
    
}
export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if(socket) socket.disconnect();
  }