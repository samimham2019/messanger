import react,{useState} from 'react'
import '../styles/SignUP.css'
import SignIn from './SignIn'
import Create from './Create'
import { Slide } from 'react-slideshow-image';
import image1 from '../assets/images/1.svg'
import image2 from '../assets/images/2.svg'
import image3 from '../assets/images/3.svg'


const slideImages = [
    {
      url: image1,
      caption: 'Slide 1'
    },
    {
      url: image2,
      caption: 'Slide 2'
    },
    {
      url: image3,
      caption: 'Slide 3'
    },
  ];

const SignUp = ({setstate,state})=>{
    const [change,setchange] = useState(true)
    

    return(
        <div className="window">
            <div className="nav">
                
                <div className="container">
                <div className="box">
                    <div className="sign-section">
                    <div className="signin" onClick={()=>{
                        document.querySelector('.circle').style.marginLeft = '0px'
                        setchange(true)
                    }}>Sign In</div>
                    <div className="signup" onClick={()=>{
                        document.querySelector('.circle').style.marginLeft = '80px'
                        setchange(false)
                    }}>Sign Up</div>
                    </div>
                    
                    <div className="line">
                        <div className="circle">

                        </div>
                    </div>  
                    {
                        change
                        ?
                        <SignIn setstate = {setstate}/>
                        :
                        <Create setstate = {setstate} state = {state}/>
                    }
                </div>
                  
                </div>
            </div>
            <div className="main-section">
            <div className="slide-container">
        <Slide>
         {
         slideImages.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <div className='image' style={{'backgroundImage': `url(${slideImage.url})`}}>
                
              </div>
            </div>
          ))
          } 
        </Slide>
      </div>
            </div>
        </div>
    )
}


export default SignUp


