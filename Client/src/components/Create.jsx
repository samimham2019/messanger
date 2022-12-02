
import react,{useState} from 'react'
import '../styles/Create.css'
import axios from '../components/axios'

const Create = ({setstate,state})=>{
    const [username,setusername] = useState('')
    const [number,setnumber] = useState('')

    const Save = ()=>{
        
        axios.post('/user/register',{
            number, username
        }).then(res=>{
            console.log(res)
            sessionStorage.setItem('logged',true)
            setstate(true)
        })
    }

    return(
        <div className="signIN-section">
            <input type="text" className='username' onChange={(e)=>setusername(e.target.value)} />
            <input type="number" className='password' onChange={(e)=>setnumber(e.target.value)}/>
            <button className='signIn' onClick={
                ()=>{
                    Save()
                }
            } >Sign Up</button>
        </div>
       
    )
}

export default Create
