import Link from 'next/link'
import { useState } from 'react'
import {useCookies} from 'react-cookie'
import { useRouter } from 'next/router'

export default function Home() {
  const [cookie, setCookie ] = useCookies({})
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const router = useRouter()

  const handleChange = (e)=>{
    //console.log({value: e.target.value , name: e.target.name})
    setCredentials({
      ...credentials,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log(credentials)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }
    /*
    await fetch(`${process.env.NEXT_PUBLIC_BASIC_BACKEND_URL}/user/login`,requestOptions)
    .then(res => {
      if(res.status === 200) router.push('/products/create')
      res.json()
    })
    .then(data =>{
        console.log(data.jwt)
        
        setCookie('jwtCookie',data.jwt, {
          path: "/",
          sameSite: true
        })
      })
*/
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASIC_BACKEND_URL}/user/login`,requestOptions)
      console.log(response.status)
      if(response.status== 200){
        const res = response.json()
        router.push('/products/create')
        res.then((data) => {
          console.log(data.jwt);
          setCookie('jwtCookie',data.jwt, {
            path: "/",
            sameSite: true
          })
        }
        )

      }
  }
  return (
    <div>
      <h1> INVENTARIO </h1>
      
      <form onSubmit={handleSubmit}>
        <input name='username' type='text' placeholder='Username' onChange={handleChange}></input>
        <input name='password' type='password' placeholder='Password' onChange={handleChange}></input>
        <button>Ingresar</button>
      </form>
    </div>
  )
}
