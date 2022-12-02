import react,{useState,useEffect} from 'react'
import '../styles/fontawesome/css/all.css'
import image from '../assets/images/a.jpg'
import io from 'socket.io-client'
import axios from './axios'
import { useLocation } from 'react-router-dom'
import {Shared, Local, dev} from './Base'

const Messages = ()=>{
    const [message, setMessage] = useState('')
    const [data, setdata] = useState([])
    const [reply,setreply] = useState([])
    const [sent, setsent] = useState([])
    const [socket, setSocket] = useState('')

    useEffect(()=>{
        setSocket(io(dev ? Local : Shared))
    },[])
    const user = JSON.parse(localStorage.getItem('user'))
    const {state} = useLocation()
    const {username, number} = state

    const joinRoom = ()=>{
        socket.emit('join-room',user[0].number,()=>{
            console.log('room joint successfully')
        })
    }

    useEffect(()=>{
        if(socket !== ''){
            
            socket.on('send-all',(data)=>{
            
                const userinfo = {
                    username,
                    number,
                    msg: data,
                    date: new Date().toLocaleDateString()
                }
                console.log(userinfo)
                let messages = JSON.parse(localStorage.getItem('messages')) || []
                messages = [...messages, userinfo]
                localStorage.setItem('messages',JSON.stringify(messages))
                setreply(messages)
            })
        }
        axios.get('/user/getusers')
        .then((data)=>{
            setdata(data.data)
           
        })
    },[socket])
    let messages = JSON.parse(localStorage.getItem('messages')) || []
    
   
    console.log(user)
    const send = ()=>{
        // emit => send 
        // on => receive
       
        socket.emit('send-message',user[0].number,{message},()=>{
            console.log('message sent succefully')
        })
        let messages = JSON.parse(localStorage.getItem('message2')) || []
        messages = [...messages, message]
        localStorage.setItem('message2',JSON.stringify(messages))
        setsent(messages)
    }

   


    return(
        <>
            <div className="chat-section" style={{overflowY: 'auto'}}>
                <div className='parent'style={{height: 'auto', width: '100%',display: 'flex', }}>
                <div style={{height: 'auto', width: '50%'}}>
                {
                    reply.map(item=>{
                        return(
                           
                            <div className="display-message">
                                <div className="img">
                                <img src={image} alt="" />
                                </div>
                            
                                    <h5 style={{backgroundColor: 'lightgray', width: '200px', borderTopRightRadius: '15px', borderBottomRightRadius: '15px', borderBottomLeftRadius:'15px'}}>
{ item.msg.message}
                                    </h5>
                                   
                            </div>
                        )
                    })
                }
                    </div>
                    <div style={{height: 'auto', width: '50%'}}>
                {
                    sent.map(item=>{
                        return(
                           
                            <div className="display-message" style={{display: 'grid', gridTemplateColumns: '70% 10%'}} >
                                
                            
                                    <h5 style={{backgroundColor: 'lightgray', width: '200px', borderBottomRightRadius: '15px', borderBottomLeftRadius:'15px', borderTopLeftRadius: '15px'}}>
{ item}
                                    </h5>
                                <div className="img">
                                    <img src={image} alt="" />
                                </div>
                            </div>
                        )
                    })
                }
                    </div>
                </div>
              
                
                </div>
                    
                    <div className="input-section">
                        <div className="section">
                                <span className='fas fa-face-grin-beam'></span>
                        <div className="input">
                                <input type="text" placeholder='Type a message' onChange = {(e)=>setMessage(e.target.value)} />
                        </div>
                                <i class="fa-solid fa-paperclip" style={{width: '50px', marginTop: '15px'}}></i>
                        </div>
                            <button className='fas fa-paper-plane' style={{marginRight: '100px', border: 'none', height: '50px', width: '50px',backgroundColor: 'teal'}} onClick={send} ></button>
                        </div>
                        </>
    )
}

export default Messages