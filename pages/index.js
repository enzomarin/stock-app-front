import Link from 'next/link'
import { useState } from 'react'


export default function Home() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })


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
    await fetch(`${process.env.NEXT_PUBLIC_BASIC_BACKEND_URL}/user/login`,requestOptions)
    .then(res => res.json())
    .then(data => console.log(data))
  }
  return (
    <div>
      <h1> Hola mundo </h1>
      <Link href= '/products/create'> Crear nuevo producto</Link>
      <form onSubmit={handleSubmit}>
        <input name='username' type='text' placeholder='Username' onChange={handleChange}></input>
        <input name='password' type='password' placeholder='Password' onChange={handleChange}></input>
        <button>Ingresar</button>
      </form>
    </div>
  )
}
