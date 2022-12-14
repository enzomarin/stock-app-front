import { useState } from 'react'
import {useCookies} from 'react-cookie'
import { useRouter } from 'next/router'
import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, InputRightElement, useColorMode, useColorModeValue } from '@chakra-ui/react'
import {FaUserAlt} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import {IoSunny, IoMoon} from 'react-icons/io5'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'


export default function Index() {
  const {toggleColorMode} = useColorMode()
  const formBackGround = useColorModeValue('gray.400', 'gray.700')
  const [toggle, setToggle] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [cookie, setCookie ] = useCookies({})
  const toast = useToast()

  
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
    /*
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }

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
      else{
        console.log('hola')
        toast({
          title: 'Error!',
          description: 'Credenciales incorrectas!',
          status:'error',
          duration:'4000',
          isClosable:true
        })
      }
      */

    await axios.post(`${process.env.NEXT_PUBLIC_BASIC_BACKEND_URL}/user/login`,credentials, {withCredentials: true})
    .then((res) =>{
      console.log(res.status);
      router.push('/home')
    })
    .catch((error)=>{
      console.log(error.response);
      toast({
        title: 'Error!',
        description: error.response.data.message,
        status: 'error',
        duration:'4000',
        isClosable:true
      })
    })


  }

  const showPassword = () => setShowPass(!showPass)
  return (
    <Flex height={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <Flex direction={'column'} background={formBackGround} p={12} rounded={6} position={'relative'} onSubmit={handleSubmit}>
        <Heading mb={6}>Log in</Heading>

        <InputGroup size='sm' mb={3}>
          <InputLeftElement pointerEvents='none' children={<FaUserAlt/>} color='gray.400' fontSize='1rem' />
          <Input  _focusVisible={'none'} name='username'  type={'text'} placeholder={'Username'} variant={'filled'} onChange={handleChange}></Input>
        </InputGroup>

        <InputGroup size='sm' mb={3}>
          <InputLeftElement pointerEvents='none' children={<RiLockPasswordFill/>} color={'gray.400'} fontSize='1.2rem'/>
          <Input _focusVisible='none' name='password'  pr='4.5rem' type={showPass ? 'text' : 'password'} placeholder={'Enter password'} variant={'filled'} onChange={handleChange}></Input>
          <InputRightElement width='4.5rem'>
            <Button h='1.5rem' size='sm' onClick={showPassword} >
              {showPass ? 'Hide':'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        
        <Button colorScheme='teal' onClick={handleSubmit}>
          Log in
        </Button>

        <Box position={'absolute'} top={2} right={2} cursor='pointer' onClick={() => {
          toggleColorMode()
          setToggle(!toggle)
          }}>
          {toggle ? <IoMoon/> : <IoSunny/>}
          
        </Box>
      </Flex>
    </Flex>
  
  )
}
