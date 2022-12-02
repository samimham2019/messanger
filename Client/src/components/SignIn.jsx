
import react,{useState} from 'react'
import '../styles/SignIN.css'
import axios from '../components/axios'


const SignIn = ({setstate})=>{
    const [username,setusername] = useState('')
    const [number,setnumber] = useState('')

    const Login = ()=>{
        localStorage.setItem('user',JSON.stringify([{username, number}]))
        axios.get(`/user/getuser`,)
        .then(res=>{
                console.log(res)
                res.data.map(item =>{
                    console.log(item)
                    console.log(item.username === username)
                    console.log(item.phone === +number)

                    if(item.username === username && item.phone === +number){
                        
                        setstate(true)
                    }
                }) 
        })
    }
    

    return(
        <div className="signIN-section">
            <input type="text" className='username' onChange={(e)=>setusername(e.target.value)} />
            <input type="number" className='password' onChange={(e)=>setnumber(e.target.value)}/>
            <button className='signIn' onClick={()=>{
                Login()
            }}>Sign In</button>
        </div>
       
    )
}

export default SignIn
