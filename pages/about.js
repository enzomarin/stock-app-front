
import axios from 'axios'
import cookieCutter from 'cookie-cutter'
import { useState } from 'react'
import { useRouter } from 'next/router'

function About(){
    const router = useRouter()
    const [user, setUser] = useState({
        _id: '',
        name:'', 
        surname:'', 
        username:'', 
        email:''
    })
    const getProfile = async ()=>{
        //const response = await axios.get(`${process.env.NEXT_PUBLIC_BASIC_BACKEND_URL}/user/profile`)
        const token =cookieCutter.get('jwtCookie')
        console.log(token)
        
        await fetch(`${process.env.NEXT_PUBLIC_BASIC_BACKEND_URL}/user/profile`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setUser(data)
          })
     
    }

    const logOut = () =>{
        const token =cookieCutter.get('jwtCookie')
        console.log(token)
        // Delete a cookie
        cookieCutter.set('jwtCookie', '', { expires: new Date(0) })
        router.push('/')
    }
   return(
    <div>
       <h1>Perfil</h1>
        <pre>
            {JSON.stringify(user,null,5)}
        </pre>
       <button onClick={getProfile}>
            obtener perfil
       </button>
       <button onClick={logOut}>
            Logout
       </button>
    </div>
   )
}

export default About