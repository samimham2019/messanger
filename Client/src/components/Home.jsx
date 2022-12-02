import react,{useState,useEffect} from 'react'

import io from 'socket.io-client'
import '../styles/screen.css'
import '../styles/fontawesome/css/all.css'
import {Routes, Route,useNavigate} from 'react-router-dom'

import image from '../assets/images/a.jpg'
import axios from '../components/axios'
import Messages from './Messages'
import Info from '../screens/info'
import {Shared, Local, dev} from './Base'

const Home = ()=>{
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState('');
    const [reply,setreply] = useState('');
    const [data, setdata] = useState([]);
    let navigate = useNavigate()
   
useEffect(()=>{
    setSocket(io(dev ? Local : Shared))
},[])



useEffect(()=>{
    if(socket !== ''){
        socket.on('send-all',(data)=>{
            setreply(data)
        })
    }
    axios.get(`${dev ? Local : Shared}/user/getusers`)
    .then((data)=>{
        setdata(data.data)
       
    })
},[socket])
        

const user = JSON.parse(localStorage.getItem('user'))

    return(
        <>
        <div className="header">
                <div className="title">

                </div>
                <div className="btn-container">
                    <button className='cbtn'>CLEAR CHAT</button>
                    <button className='mbtn'>MORE</button>
                </div>
            </div>
            <div className='screen'>
                <div className="users">
                    {
                        data.map(user => {
                            return(
                                <div className="user" onClick={()=> navigate('/Message',{state: user})}>
                                    <div className="img">
                                        <img src={image} alt="" />
                                    </div>
                                    <div className="name">
                                     {user.username}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="main">
                   <Routes>
                        <Route path='/' element = {<Info/>}/>
                        <Route path='/Message' element = {<Messages/>}/>
                   </Routes>
                    
                  
                </div>
        </div>
        </>
       
    )
}

export default Home